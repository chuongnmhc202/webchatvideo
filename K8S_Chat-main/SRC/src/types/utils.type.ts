export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
export interface SuccessResponse<Data> {
  message: string
  data: Data
}

// syntax '-?' will remove property undefined of key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

export interface changePassword {
  confirm_password: string | undefined;
  new_password: string | undefined;
  password: string | undefined;
}

export interface GroupMemberInfo {
  group_id: string;
  user_phone: string;
  role: 'member' | 'admin' | 'owner';
  joined_at: string; // ISO date string
  status: number; // 1 = active
  name: string;
  email: string;
  avatar: string | null;
  user_status: string; // OFFLINE, ONLINE, etc.
}

export interface AddMembersBody {
  memberPhones: string[]
}


export interface IMessage {
  _id?: string;
  sender: string;
  receiver: string;
  is_group: boolean;
  content_type: 'text' | 'image' | 'file' | 'video' | 'video_call_signal';
  timestamp?: string | number | Date;
  status?: 'sent' | 'delivered' | 'read';
  url_file?: string;
  name_file?: string;
  size_file?: string;
  mime_type_file?: string;
  duration_video?: string;
  text?: string;
  type_video_call?: 'offer' | 'answer' | 'ice-candidate';
  sdp?: string;
  candidate?: string;
  sdpMid?: string;
  sdpMLineIndex?: string;
  avt?: string;
  name?: string;
  // ✅ Mảng reaction, mặc định rỗng
  reactions?: {
    user: string;      // phone
    userName: string;  // tên
    emoji: string;     // ❤️, 👍, 😂 ...
  }[];
}

export interface IMessageExtended extends IMessage {
  typeSend: string;
}

export interface GetMessagesQuery {
  sender: string; // Số điện thoại hoặc ID người gửi
  receiver: string; // Số điện thoại hoặc ID người nhận
  is_group: boolean; // true nếu là tin nhắn nhóm
  limit?: number; // Số lượng tin nhắn lấy về, mặc định 5
  lastMessageTimestamp?: string; // Thời gian của tin nhắn cuối cùng để lấy tin nhắn sau nó
}


export interface Notification {
  _id: string;
  type: 'friend_request' | 'friend_accept' | 'friend_remove' | 'message';
  content: string;
  sender: string;
  receiver: string;
  status: 'unread' | 'read';
  is_group: boolean;
  timestamp: string;
  __v: number;
}

export interface CreateNotificationInput {
  type: 'friend_request' | 'friend_accept' | 'friend_remove' | 'message';
  content: string;
  sender: string;
  receiver: string;
  is_group: boolean;
}


export interface GetNotificationsQuery {
  limit?: number; // Số lượng tin nhắn lấy về, mặc định 5
  page?: number; // Thời gian của tin nhắn cuối cùng để lấy tin nhắn sau nó
}