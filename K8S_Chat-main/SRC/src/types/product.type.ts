export interface UserT {
  email: string
  name?: string
  date_of_birth?: string // ISO 8610
  avatar?: string
  address?: string
  phone?: string
  status?: string
  role?: string
  password_hash?: string
  createdAt: string
  updatedAt: string
  isFriend?: boolean
}
export interface UserTList {
  users: UserT[]
  pagination: {
    page: number
    limit: number 
    page_size: number
  }
}

export interface IUserSession {
  id: string; // hoặc number nếu id là number
  user_phone: string;
  userAgent: string;
  ipAddress: string;
  user_agent: string;
  status:string;
  loginAt: Date;
  logoutAt?: Date | null;
}


export interface UserTListConfig {
  page?: number | string
  limit?: number | string
  sort_by?: 'createdAt' | 'price' | 'rating' | 'sold' | 'view'
  order?: 'asc' | 'desc'
  name?: string
}

export interface BlockedFriend {
  f_user_phone: string
  f_friend_phone: string
  f_status: 'blocked'
  u_phone: string
  u_email: string
  u_status: 'ONLINE' | 'OFFLINE'
  u_avatar: string
  u_createdAt: string // ISO date string
  u_name: string
}


export interface FriendTListConfig {
  name?: string
  type?: string
}

export interface GroupTListConfig {
  name?: string
}

export type Product = {
  id: string;
  name: string;
  price: number;
};
