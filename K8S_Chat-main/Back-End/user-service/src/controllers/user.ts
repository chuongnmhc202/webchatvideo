import { Request, Response, } from 'express'
import { User, SuccessResponse } from '../interface/type'

import {
  findUsersByPhone,
  updateUserProfileService,
  changeUserPasswordService,
  updateUserStatusByPhoneService,
  getProfileByPhone,
  getUsersWithOptionalSearchAndPaginationService,
  getUserFriendsServiceControll,
  getUserGroupIdsService,
  getBlockedFriends,
  searchUsersByName,
  sendResetPasswordEmail,
  toggleUserStatusService,
  addReportService,
  getReportsByDateService,
  updateReportStatusService,
  createUserSessionService,
  logoutUserSessionService,
  getUserSessionsService,
  forgotPassword
} from '../services/user.service';


export const getUsersByPhone = async (req: Request, res: Response): Promise<void> => {
  const { phone } = req.params;

  try {
    const user = await getProfileByPhone(phone);
    if (!user) {
      res.status(404).json({ message: 'User not found', data: { user: null } });
      return;
    }
    const response: SuccessResponse<User> = {
      message: 'User fetched successfully',
      data: user
    };
    res.status(200).json(response);
  } catch (error: any) {
    console.error('Error fetching users by phone:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};


export const getUsersByPhoneLike = async (req: Request, res: Response): Promise<void> => {
  const { phone } = req.params;

  try {
    const users = await findUsersByPhone(phone);
    res.status(200).json(users);
  } catch (error: any) {
    console.error('Error fetching users by phone:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

// ✏️ Cập nhật profile user
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  const { phone } = req.params;
  const { name, email, avatar } = req.body;

  try {
    const updatedUser = await updateUserProfileService(phone, {
      name,
      email,
      avatar
    });

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }


    const response: SuccessResponse<User> = {
      message: 'User fetched successfully',
      data: updatedUser
    };
    res.status(200).json(response);
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const changeUserPassword = async (req: Request, res: Response): Promise<void> => {
  const { phone } = req.params;
  const { password, new_password, confirm_password } = req.body;

  if (!password || !new_password) {
    res.status(400).json({ error: 'Old and new passwords are required' });
    return;
  }

  if (new_password.length < 3) {
    res.status(400).json({ error: 'New password must be at least 6 characters' });
    return;
  }

  try {
    const updatedUser = await changeUserPasswordService(phone, password, new_password);
    res.status(200).send('Password changed successfully');

  } catch (error: any) {
    console.error('Error changing password:', error);
    res.status(400).json({ error: error.message || 'Failed to change password' });
  }
};

// 🔄 Cập nhật trạng thái user
export const updateUserStatusByPhone = async (req: Request, res: Response): Promise<void> => {
  const { phone } = req.params;
  const { status } = req.body;

  if (!status || (status !== 'ONLINE' && status !== 'OFFLINE')) {
    res.status(400).json({ error: 'Status must be either ONLINE or OFFLINE' });
    return;
  }

  try {
    const user = await updateUserStatusByPhoneService(phone, status);
    res.status(200).json({ message: 'Status updated successfully', user });
  } catch (error: any) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};


export const getPaginatedUsers = async (req: Request, res: Response): Promise<void> => {
  const { phone } = req.params;
  const page = parseInt(req.query.page as string) || 0;
  const pageSize = parseInt(req.query.pageSize as string) || 8;
  const name = req.query.name as string | undefined;
  const sortBy = req.query.sort_by as string | undefined; // Add sort_by query parameter
  console.log(phone, page, pageSize, name, sortBy)
  try {
    const result = await getUsersWithOptionalSearchAndPaginationService(phone, page, pageSize, name, sortBy);

    const response: SuccessResponse<typeof result> = {
      message: 'Users fetched successfully',
      data: result
    };
    res.status(200).json(response);
  } catch (error: any) {
    console.error('Error fetching users with pagination:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};


export const getUserFriendsController = async (req: Request, res: Response) => {
  try {
    const { phone } = req.params;
    const name = req.query.name as string | undefined;
    const type = req.query.type as string | '0';

    if (!phone || typeof phone !== 'string') {
      return res.status(400).json({ message: 'Missing or invalid phone parameter' });
    }

    const friends = await getUserFriendsServiceControll(phone, name, type);

    return res.status(200).json({ friends });
  } catch (error: any) {
    console.error('Error fetching user friends:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserGroupIdsController = async (req: Request, res: Response): Promise<void> => {
  const { phone } = req.params;

  if (!phone || typeof phone !== 'string') {
    res.status(400).json({ message: 'Missing or invalid phone parameter' });
    return;
  }

  try {
    const groupIds = await getUserGroupIdsService(phone);
    res.status(200).json(groupIds); // ← chỉ trả về mảng
  } catch (error: any) {
    console.error('Error fetching group IDs:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message || 'Unknown error',
    });
  }
};


export const getBlockedFriendsController = async (req: Request, res: Response): Promise<void> => {
  const { phone } = req.params;

  if (!phone || typeof phone !== 'string') {
    res.status(400).json({ message: 'Missing or invalid phone parameter' });
    return;
  }

  try {
    const blockedFriends = await getBlockedFriends(phone);


    res.status(200).json(blockedFriends);
  } catch (error: any) {
    console.error('Error fetching blocked friends:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message || 'Unknown error',
    });
  }
};


export const getUserAdminController = async (req: Request, res: Response): Promise<void> => {
  const name = req.query.name as string | "";
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;

  try {
    const blockedFriends = await searchUsersByName(name, page, limit);


    res.status(200).json(blockedFriends);
  } catch (error: any) {
    console.error('Error fetching blocked friends:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message || 'Unknown error',
    });
  }
};


export const sendEmailController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    await sendResetPasswordEmail(email);

    return res.json(email);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
};

export const sendEmailForgotPassController = async (req: Request, res: Response) => {
  try {
    const { email, phone } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!phone) {
      return res.status(400).json({ message: "Phone is required" });
    }

    await forgotPassword(email, phone);

    return res.json({ message: "Password reset email sent successfully" });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "không tìm thấy người dùng theo yêu cầu" });
  }
};

export const toggleUserStatusController = async (req: Request, res: Response) => {
  try {
    const { phone } = req.params;

    const updatedUser = await toggleUserStatusService(phone);

    return res.status(200).json('Cập nhật trạng thái thành công');
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Có lỗi xảy ra",
    });
  }
};


export const addReportController = async (req: Request, res: Response) => {
  try {
    const { reported_phone, reporter_phone, reason } = req.body;
    const report = await addReportService(reported_phone, reporter_phone, reason);
    res.json(report);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


// GET /api/reports?date=2025-08-16
export const getReportsByDateController = async (req: Request, res: Response) => {
  try {
    const { date } = req.params as { date: string };
    const reports = await getReportsByDateService(date);
    res.json(reports);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PATCH /api/reports/:id
export const updateReportStatusController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const report = await updateReportStatusService(id, status);
    res.json(report);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Tạo session khi login
export const createUserSession = async (req: Request, res: Response) => {
  try {
    const { userPhone, ipAddress, userAgent } = req.body;
    const session = await createUserSessionService(userPhone, "2001:4860:7:812::e9", "Mozilla/5.0 (platform; rv:gecko-version) Gecko/gecko-trail Firefox/firefox-version");
    res.json(session);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Logout session
export const logoutUserSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const session = await logoutUserSessionService(Number(id));
    res.json(session);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


// Lấy danh sách session theo user
export const getUserSessions = async (req: Request, res: Response) => {
  try {
    const { userPhone } = req.params;
    const sessions = await getUserSessionsService(userPhone);
    res.json(sessions);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
