import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/UserEntity";
import { Like, Not } from "typeorm";
import { User as UserInterface  } from '../interface/type';
import { Friend } from "../database/entities/FriendEntity";
import { GroupMember } from "../database/entities/GroupMemberEntity";


export const getProfileByPhone = async (phone: string): Promise<UserInterface | null> => {
  const user = await AppDataSource.getRepository(User).findOne({
    where: { phone },
    select: ['phone', 'name', 'email', 'password_hash', 'avatar', 'status', 'createdAt'],
  });

  return user || null;
};

export const findUsersByPhone = async (phone: string) => {
  return AppDataSource.getRepository(User).find({
    where: {
      phone: Like(`%${phone}%`),
    },
  });
};


export const updateUserProfileService = async (
  phone: string,
  data: Partial<Omit<User, 'password_hash' | 'createdAt' | 'status'>>
): Promise<User | null> => {
  const repo = AppDataSource.getRepository(User);

  await repo.update({ phone }, data);

  const updatedUser = await repo.findOne({
    where: { phone },
    select: ['phone', 'name', 'email', 'avatar', 'status', 'createdAt'],
  });

  return updatedUser ? updatedUser as User : null;
};


export const changeUserPasswordService = async (phone: string, oldPassword: string, newPassword: string) => {
  const user = await AppDataSource.getRepository(User).findOne({ where: { phone } });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = oldPassword === user.password_hash;

  if (!isPasswordValid) {
    throw new Error('Invalid old password');
  }

  user.password_hash = newPassword;
  await AppDataSource.getRepository(User).save(user);

  return 'Password updated';
};

export const updateUserStatusByPhoneService = async (
  phone: string,
  status: 'ONLINE' | 'OFFLINE' | string
) => {
  const user = await AppDataSource.getRepository(User).findOne({ where: { phone } });

  if (!user) {
    throw new Error('User not found');
  }

  user.status = status;
  await AppDataSource.getRepository(User).save(user);

  return user;
};




interface PaginatedUser extends User {
  isFriend: boolean;
}

interface PaginatedResponse {
  users: PaginatedUser[];
  pagination: {
    page: number;
    limit: number;
    page_size: number;
  };
}

export const getUsersWithOptionalSearchAndPaginationService = async (
  phone: string,
  page: number = 0,
  pageSize: number = 5,
  searchPhone?: string,
  sortBy?: string
) => {
  const userWhereCondition = {
    phone: Not(phone),
    ...(searchPhone ? { phone: Like(`%${searchPhone}%`) } : {}),
  };

  const orderBy = sortBy === 'createdAt' ? { createdAt: 'DESC' as const } : undefined;

  const users = await AppDataSource.getRepository(User).find({
    where: userWhereCondition,
    skip: page * pageSize,
    take: pageSize,
    order: orderBy ,
    select: ['phone', 'name', 'email', 'avatar', 'status', 'createdAt'],
  });

  // Fetch friends' phones and check friendship status
  const friends = await getUserFriendsService(phone);
  const friendPhoneSet = new Set(friends.map((f) => f.friend_phone));

  const usersWithFriendStatus = users.map((user) => ({
    ...user,
    isFriend: friendPhoneSet.has(user.phone),
  }));

  const totalUsers = await AppDataSource.getRepository(User).count({ where: userWhereCondition });

  return {
    users: usersWithFriendStatus,
    pagination: {
      page,
      limit: pageSize,
      page_size: totalUsers,
    },
  };
};


export const getUserFriendsService = async (phone: string, name?: string) => {
  const nameFilter = name ? `%${name}%` : null;

  const friends = await AppDataSource.getRepository(Friend)
    .createQueryBuilder('f')
    .innerJoinAndSelect('f.friend', 'friend')
    .where('(f.user_phone = :phone OR f.friend_phone = :phone)', { phone })
    .andWhere('f.status = :status', { status: 'accepted' })
    .andWhere(nameFilter ? 'friend.name LIKE :name' : '1=1', { name: nameFilter })
    .getMany();

  return friends
};



export const getUserFriendsServiceControll = async (phone: string, name?: string, type?: string) => {
  const nameFilter = name ? `%${name}%` : null;

  const query = await AppDataSource.getRepository(Friend)
    .createQueryBuilder('f')
    .innerJoinAndSelect('f.friend', 'friend')
    .innerJoinAndSelect('f.user', 'user')
    .where('(f.user_phone = :phone OR f.friend_phone = :phone)', { phone });
      // Lọc theo type
  if (type == "4") {
    query.andWhere('f.status = :status', { status: 'no' });
  } else {
    query.andWhere('f.status = :status', { status: 'accepted' });
  }

  const friends = await query.getMany();

  // Xử lý để trả về đúng user còn lại + last_message + last_message_date
  const result = friends
    .map((friend) => {
      const isUser = friend.user_phone === phone;
      const otherUser = isUser ? friend.friend : friend.user;

      // Apply name filter (nếu có)
    if (nameFilter && !otherUser.name.toLowerCase().includes(name?.toLowerCase() || '')) {
      return null;
    }


      return {
        user: otherUser,
        last_message: friend.last_message,
        last_message_date: friend.last_message_date,
        unread_count_user: friend.unread_count_user,
        unread_count_friend: friend.unread_count_friend,
        user_phone: friend.user_phone,
        friend_phone: friend.friend_phone
      };
    })
    .filter((item) => item !== null);

  return result;
};


  

// getPendingFriendRequestsService: Lấy danh sách lời mời kết bạn chờ
export const getPendingFriendRequestsService = async (userPhone: string) => {
  return AppDataSource.getRepository(Friend).find({
    where: {
      friend_phone: userPhone,
      status: 'pending',
    },
    relations: ['user'],
  });
};

  
export const getFriendDetailsService = async (userPhone: string, friendPhone: string) => {
  // Query to find the accepted friend relationship between the two users
  const friend = await AppDataSource.getRepository(Friend)
    .createQueryBuilder('f')
    .leftJoinAndSelect('f.user', 'user')
    .leftJoinAndSelect('f.friend', 'friend')
    .where(
      '(f.user_phone = :userPhone AND f.friend_phone = :friendPhone) OR (f.user_phone = :friendPhone AND f.friend_phone = :userPhone)',
      { userPhone, friendPhone }
    )
    .andWhere('f.status = :status', { status: 'accepted' })
    .getOne();

  // If no accepted friendship is found, throw an error
  if (!friend) {
    throw new Error('No accepted friendship found');
  }

  // Return the friend details based on the userPhone
  let friendPhone_ = friend.user_phone === userPhone ? friend.friend_phone : friend.user_phone;
  let friendDetails = await AppDataSource.getRepository(User).findOne({ where: { phone: friendPhone_ } });
  
  return friendDetails;
};


export const getUsersByPhonesService = async (phones: string[], nameFilter: string | null): Promise<User[]> => {
  try {
    // Start the query to fetch users
    const query = AppDataSource.getRepository(User)
      .createQueryBuilder('user')
      .where('user.phone IN (:...phones)', { phones });

    // Apply name filtering if nameFilter is provided
    if (nameFilter) {
      query.andWhere('user.name LIKE :name', { name: `%${nameFilter}%` });
    }

    // Execute the query and return the results
    const users = await query.getMany();
    return users;

  } catch (error) {
    console.error('Error fetching users by phones:', error);
    throw new Error('Error fetching users by phones');
  }
};


export const getUserGroupIdsService = async (phone: string): Promise<number[]> => {
  const groupMembers = await AppDataSource.getRepository(GroupMember)
    .createQueryBuilder('gm')
    .select('gm.group_id', 'group_id')
    .where('gm.user_phone = :phone', { phone })
    .andWhere('gm.status = true')
    .getRawMany();

  // Trả về mảng group_id
  return groupMembers.map(gm => gm.group_id);
};

