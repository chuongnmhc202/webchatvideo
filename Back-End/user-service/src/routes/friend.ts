import { Router, Request, Response, NextFunction } from "express";
import { sendFriendRequestController, unfriendUserController, updateFriendLastMessageController, resetUnreadCountController } from "../controllers/friend";

const routerFriend: Router = Router();

routerFriend.post('/friend', (req: Request, res: Response, next: NextFunction) => {
    sendFriendRequestController(req, res).catch(next);
});

routerFriend.post('/friend/message', (req: Request, res: Response, next: NextFunction) => {
    updateFriendLastMessageController(req, res).catch(next);
});



routerFriend.post('/unfriend', (req: Request, res: Response, next: NextFunction) => {
    unfriendUserController(req, res).catch(next);
});

routerFriend.post('/friend/unread/reset', (req: Request, res: Response, next: NextFunction) => {
  resetUnreadCountController(req, res).catch(next);
});

export default routerFriend;
