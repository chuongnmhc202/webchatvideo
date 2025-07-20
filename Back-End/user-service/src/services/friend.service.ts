import { AppDataSource } from "../database/data-source";
import { Friend } from "../database/entities/FriendEntity";
import { User } from "../database/entities/UserEntity";
import axios from "axios";

const CHAT_SERVICE_BASE_URL = process.env.CHAT_SERVICE_BASE_URL || "http://localhost:8181";

export const sendFriendRequestService = async (
  senderPhone: string,
  receiverPhone: string
): Promise<string> => {
  // Kiểm tra xem người dùng có phải là chính mình không
  if (senderPhone === receiverPhone) {
    return 'You cannot send a friend request to yourself';
  }

  // Kiểm tra nếu đã có mối quan hệ kết bạn
  const existingRelation = await AppDataSource.getRepository(Friend)
    .createQueryBuilder('f')
    .where(
      '(f.user_phone = :senderPhone AND f.friend_phone = :receiverPhone) OR (f.user_phone = :receiverPhone AND f.friend_phone = :senderPhone)',
      { senderPhone, receiverPhone }
    )
    .getOne();

  if (existingRelation) {

    if (existingRelation.status === 'accepted') {
      return 'Các bạn đã là bạn bè rồi';
    }

    if (existingRelation.status === 'pending') {
      // Nếu lời mời là từ friend → user thì chấp nhận luôn
      if (existingRelation.user_phone === receiverPhone && existingRelation.friend_phone === senderPhone) {
        await AppDataSource.getRepository(Friend).update(
          { user_phone: receiverPhone, friend_phone: senderPhone },
          { status: 'accepted' }
        );
        // ✅ Gửi thông báo "friend_accept"
        try {
          await axios.post(`${CHAT_SERVICE_BASE_URL}/api/chat/notification/send`, {
            type: "friend_accept",
            content: `${senderPhone} đã chấp nhận lời mời kết bạn.`,
            sender: senderPhone,
            receiver: receiverPhone,
            is_group: false
          });
        console.log("send ok")

        } catch (error) {
          console.error("❌ Lỗi gửi notification friend_accept:", error);
        }
        return 'Hai bạn đã thành bạn bè của nhau';
      }



      throw new Error('Đã gửi yêu cầu kết bạn.');
    }


  }
  const user = await AppDataSource.getRepository(User).findOne({ where: { phone: senderPhone } });
  const friend = await AppDataSource.getRepository(User).findOne({ where: { phone: receiverPhone } });
  // Check if both user and friend exist
  if (!user || !friend) {
    throw new Error('Không tìm thấy một hoặc cả hai người dùng.');
  }
  const friendEntity = new Friend();
  friendEntity.user = user;  // Assign the user
  friendEntity.friend = friend;  // Assign the friend
  friendEntity.user_phone = senderPhone;
  friendEntity.friend_phone = receiverPhone;
  friendEntity.status = "pending"; // Example status

    // ✅ Gửi thông báo "friend_request"
  try {
    await axios.post(`${CHAT_SERVICE_BASE_URL}/api/chat/notification/send`, {
      type: "friend_request",
      content: `${senderPhone} đã gửi lời mời kết bạn.`,
      sender: senderPhone,
      receiver: receiverPhone,
      is_group: false
    });
    console.log("send")
  } catch (error) {
    console.error("❌ Lỗi gửi notification friend_request:", error);
  }



  await AppDataSource.getRepository(Friend).save(friendEntity);
  return 'Đã gửi yêu cầu kết bạn.';
};


export const respondToFriendRequest = async (phone: string, friendPhone: string, action: 'accept' | 'reject') => {
  const friendRelation = await AppDataSource.getRepository(Friend)
    .createQueryBuilder('f')
    .where(
      'f.user_phone = :friendPhone AND f.friend_phone = :phone AND f.status = :status',
      { friendPhone, phone, status: 'pending' }
    )
    .getOne();

  if (!friendRelation) {
    throw new Error('Friend request not found or already responded');
  }

  if (action === 'accept') {
    await AppDataSource.getRepository(Friend).update(
      { user_phone: friendPhone, friend_phone: phone },
      { status: 'accepted' }
    );
  } else {
    await AppDataSource.getRepository(Friend).delete({ user_phone: friendPhone, friend_phone: phone });
  }

  return 'Friend request processed';
};




export const unfriendUserService = async (userPhone: string, friendPhone: string): Promise<void> => {
  const existingFriendship = await AppDataSource.getRepository(Friend)
    .createQueryBuilder('f')
    .where(
      '(f.user_phone = :userPhone AND f.friend_phone = :friendPhone) OR (f.user_phone = :friendPhone AND f.friend_phone = :userPhone)',
      { userPhone, friendPhone }
    )
    .getOne();

  if (!existingFriendship) {
    throw new Error('No existing friend relationship found to unfriend');
  }

  // Xóa mối quan hệ kết bạn
  await AppDataSource.getRepository(Friend).delete({
    user_phone: existingFriendship.user_phone,
    friend_phone: existingFriendship.friend_phone,
  });
};


export const updateFriendLastMessageService = async (
  userPhone: string,
  friendPhone: string,
  lastMessage: string
): Promise<void> => {
  const repo = AppDataSource.getRepository(Friend);

  const relation = await repo
    .createQueryBuilder('f')
    .where(
      '(f.user_phone = :userPhone AND f.friend_phone = :friendPhone) OR (f.user_phone = :friendPhone AND f.friend_phone = :userPhone)',
      { userPhone, friendPhone }
    )
    .getOne();

  if (!relation) {
    throw new Error("Friend relationship not found.");
  }

  relation.last_message = lastMessage;
  relation.last_message_date = new Date();
  relation.unread_count = relation.unread_count + 1;

  await repo.save(relation);
};

export const resetFriendUnreadCountService = async (
  userPhone: string,
  friendPhone: string
): Promise<void> => {
  const repo = AppDataSource.getRepository(Friend);

  const relation = await repo
    .createQueryBuilder('f')
    .where(
      '(f.user_phone = :userPhone AND f.friend_phone = :friendPhone) OR (f.user_phone = :friendPhone AND f.friend_phone = :userPhone)',
      { userPhone, friendPhone }
    )
    .getOne();

  if (!relation) {
    throw new Error("Friend relationship not found.");
  }

  relation.unread_count = 0;

  await repo.save(relation);
};
