import { AppDataSource } from "../database/data-source";
import { Group } from "../database/entities/GroupEntity";
import {User} from "../database/entities/UserEntity";
import {GroupMember} from "../database/entities/GroupMemberEntity";
import { CreateGroupInput, Group as GroupInterface, GroupMemberInfo  } from '../interface/type';

export const createGroupService = async (input: CreateGroupInput): Promise<GroupInterface> => {
  const { name, ownerPhone } = input;

  if (!name || !ownerPhone) {
    throw new Error('Missing name or ownerPhone');
  }

  const owner = await AppDataSource.getRepository(User).findOne({ where: { phone: ownerPhone } });

  if (!owner) {
    throw new Error('Owner not found');
  }

  const group = await AppDataSource.getRepository(Group).save({
    name,
    owner_phone: owner.phone, // Linking owner as a User object
  });

  // Create the group member entry for the owner
  await AppDataSource.getRepository(GroupMember).save({
    group_id: group.id,
    user_phone: ownerPhone,
    role: 'owner' as const,
    status: true,
    group: group,
    user: owner,
    avatar: "https://cdn.ibispaint.com/movie/927/530/927530830/image927530830l.png"
  });

  return {
    ...group,
    id: BigInt(group.id)
  };
};

export const getGroupsByUserPhone = async (phone: string, name?: string) => {
  const qb = AppDataSource.getRepository(GroupMember)
    .createQueryBuilder('gm')
    .innerJoinAndSelect('gm.group', 'g')
    .where('gm.user_phone = :phone', { phone });

  if (name) {
    qb.andWhere('g.name LIKE :name', { name: `%${name}%` });
  }

    // 📌 Sắp xếp theo last_message_date của group
  qb.orderBy('g.last_message_date', 'DESC'); // DESC = mới nhất trước, ASC = cũ nhất trước


  const groupMembers = await qb.getMany();

  return groupMembers.map(gm => ({
    ...gm.group,
    unread_count: gm.unread_count
  }));
};


export const getGroupMembersByGroupId = async (groupId: number): Promise<GroupMemberInfo[]> => {
  if (!groupId) {
    throw new Error('Missing groupId');
  }

  const members = await  AppDataSource.getRepository(GroupMember)
    .createQueryBuilder('gm')
    .leftJoinAndSelect('gm.user', 'user')
    .where('gm.group_id = :groupId', { groupId })
    .andWhere('gm.status = true')
    .getMany();

  return members.map(m => ({
    group_id: m.group_id.toString(),
    user_phone: m.user_phone,
    role: m.role || 'member',
    joined_at: m.joined_at?.toISOString() || '',
    status: m.status ? 1 : 0,
    name: m.user.name,
    email: m.user.email,
    avatar: m.user.avatar,
    user_status: m.user.status || '',
  }));
};

export const addMembersToGroup = async (groupId: number, memberPhones: string[]): Promise<string> => {
  if (!groupId || !memberPhones || memberPhones.length === 0) {
    throw new Error('Missing groupId or memberPhones');
  }

  const group = await AppDataSource.getRepository(Group).findOne({ where: { id: groupId } });

  if (!group) {
    throw new Error('Group not found');
  }

  const groupMembers = memberPhones.map(phone => ({
    group_id: groupId,
    user_phone: phone,
    role: 'member' as const,
    status: true
  }));

  // Batch insert the members
  await AppDataSource.getRepository(GroupMember).save(groupMembers);

  return 'OK';
};


export const removeMemberFromGroup = async (groupId: number, userPhone: string): Promise<string> => {
  if (!groupId || !userPhone) {
    throw new Error('Missing groupId or userPhone');
  }

  const member = await AppDataSource.getRepository(GroupMember)
    .findOne({ where: { group_id: groupId, user_phone: userPhone } });

  if (!member) {
    throw new Error('Member not found in group');
  }

  // Check if the member is the owner
  if (member.role === 'owner') {
    return 'Failed'; // You cannot remove the owner
  }

  await AppDataSource.getRepository(GroupMember).delete({ group_id: groupId, user_phone: userPhone });

  return 'Deleted';
}

export const updateGroupLastMessageService = async (
  groupId: number,
  lastMessage: string,
  sender: string
): Promise<void> => {
  const groupRepo = AppDataSource.getRepository(Group);
  const memberRepo = AppDataSource.getRepository(GroupMember);

  const group = await groupRepo.findOne({ where: { id: groupId } });

  if (!group) {
    throw new Error('Group not found');
  }

  group.last_message = lastMessage;
  group.last_message_date = new Date();

  await groupRepo.save(group);

await memberRepo
  .createQueryBuilder()
  .update(GroupMember)
  .set({ unread_count: () => "unread_count + 1" })
  .where("group_id = :groupId AND user_phone != :senderPhone", {
    groupId,
    senderPhone: sender, // 👈 fix ở đây
  })
  .execute();


};


export const resetGroupUnreadCountService = async (
  groupId: number,
  userPhone: string
): Promise<void> => {
  const repo = AppDataSource.getRepository(GroupMember);

  const member = await repo.findOne({
    where: { group_id: groupId, user_phone: userPhone }
  });

  if (!member) {
    throw new Error('Group member not found');
  }

  member.unread_count = 0;
  await repo.save(member);
};


export const updateGroupInfoService = async (
  groupId: number,
  updateData: { name?: string; avatar?: string }
): Promise<Group> => {
  if (!groupId) {
    throw new Error("Missing groupId");
  }

  const groupRepo = AppDataSource.getRepository(Group);
  const group = await groupRepo.findOne({ where: { id: groupId } });

  if (!group) {
    throw new Error("Group not found");
  }

  if (updateData.name !== undefined) {
    group.name = updateData.name;
  }

  if (updateData.avatar !== undefined) {
    group.avatar = updateData.avatar;
  }

  await groupRepo.save(group);

  return group;
};