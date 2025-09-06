import { Router, Request, Response, NextFunction } from "express";
import { sendEmailForgotPassController, toggleUserStatusController, sendEmailController, getUserAdminController, getBlockedFriendsController, getUserGroupIdsController, getUsersByPhone, getPaginatedUsers,getUserFriendsController, getUsersByPhoneLike, updateUserProfile, changeUserPassword, updateUserStatusByPhone } from "../controllers/user";

import {
  addReportController,
  getReportsByDateController,
  updateReportStatusController,
  createUserSession,
logoutUserSession,
getUserSessions
} from "../controllers/user";

const router: Router = Router();

router.get('/profile/:phone', (req: Request, res: Response, next: NextFunction) => {
    getUsersByPhone(req, res).catch(next);
});


// ✅ Cập nhật thông tin người dùng theo số điện thoại
router.put('/profile/:phone', (req: Request, res: Response, next: NextFunction) => {
    updateUserProfile(req, res).catch(next)
})

router.patch('/profile/:phone/password', (req: Request, res: Response, next: NextFunction) => {
    changeUserPassword(req, res).catch(next);
});

router.get('/paginate/:phone', (req: Request, res: Response, next: NextFunction) => {
    getPaginatedUsers(req, res).catch(next);
});

router.get('/friend/:phone', (req: Request, res: Response, next: NextFunction) => {
    getUserFriendsController(req, res).catch(next);
});

router.get('/block/:phone', (req: Request, res: Response, next: NextFunction) => {
    getBlockedFriendsController(req, res).catch(next);
});


router.get('/group/:phone', (req: Request, res: Response, next: NextFunction) => {
    getUserGroupIdsController(req, res).catch(next);
});

router.get('/user-admin', (req: Request, res: Response, next: NextFunction) => {
    getUserAdminController(req, res).catch(next);
});

router.post('/user-admin-reset', (req: Request, res: Response, next: NextFunction) => {
    sendEmailController(req, res).catch(next);
});

router.patch('/user-admin-reset-status/:phone', (req: Request, res: Response, next: NextFunction) => {
    toggleUserStatusController(req, res).catch(next);
});

// ============ REPORT ROUTES ============
router.post("/report", (req: Request, res: Response, next: NextFunction) => {
  addReportController(req, res).catch(next);
});

router.get("/report/date/:date", (req: Request, res: Response, next: NextFunction) => {
  getReportsByDateController(req, res).catch(next);
});

router.patch("/report/:id/status", (req: Request, res: Response, next: NextFunction) => {
  updateReportStatusController(req, res).catch(next);
});


// Tạo session khi user login
router.post("/session", (req: Request, res: Response, next: NextFunction) => {
  createUserSession(req, res).catch(next);
});

// Logout session
router.put("session/:id/logout", (req: Request, res: Response, next: NextFunction) => {
  logoutUserSession(req, res).catch(next);
});

// Lấy danh sách session của 1 user theo phone
router.get("/session/:userPhone", (req: Request, res: Response, next: NextFunction) => {
  getUserSessions(req, res).catch(next);
});

// Tạo session khi user login
router.post("/forgot-pass", (req: Request, res: Response, next: NextFunction) => {
  sendEmailForgotPassController(req, res).catch(next);
});



export default router;

