import { Router } from 'express';
import { register, login, googleAuth, logout } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

authRouter.get('/google', googleAuth);

authRouter.get('/logout', logout);

export default authRouter;
