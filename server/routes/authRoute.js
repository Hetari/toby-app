import { Router } from 'express';
import {
  register,
  login,
  googleAuth,
  logout,
} from '../controllers/authController.js';
import passport from 'passport';

const authRouter = Router();

// it is obviously much better to encapsulate them into a POST request

authRouter.post('/register', register);
authRouter.post('/login', login);

authRouter.get('/google', googleAuth);
authRouter.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: process.env.FRONTEND_URL,
  })
);

authRouter.get('/logout', logout);

export default authRouter;
