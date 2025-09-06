import { Router, Request, Response, NextFunction } from "express";
import { loginAdmin, login, register, logout } from "../controllers/auth";

const router: Router = Router();

router.post('/login-admin', (req: Request, res: Response, next: NextFunction) => {
    loginAdmin(req, res).catch(next);        
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    login(req, res).catch(next);        
});

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
    register(req, res).catch(next);
});

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    logout(req, res).catch(next);
});

export default router;

