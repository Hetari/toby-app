import { Router } from 'express';
import {
  register,
  login,
  googleAuth,
  logout,
} from '../controllers/authController.js';
import passport from 'passport';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const authRouter = Router();

// it is obviously much better to encapsulate them into a POST request

authRouter.post('/register', register);
authRouter.post('/login', login);

authRouter.get('/google', googleAuth);

/**
 * This route is used after the user has been authenticated by google.
 * It calls the passport.authenticate middleware which handles the authentication
 * and sets the user object in the request.
 * We then check if the user object is not null, if so we return the user data.
 * Otherwise we return a 401 Unauthorized status code.
 * The access_type: 'offline' option is used to get a refresh token that can be used
 * to get a new access token without the need to reauthenticate the user.
 * The scope: ['email', 'profile'] option is used to get the user's email and profile info.
 */
authRouter.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: process.env.FRONTEND_URL,
    access_type: 'offline',
    scope: ['email', 'profile'],
  }),
  (req, res) => {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: ReasonPhrases.UNAUTHORIZED,
      });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      data: req.user,
    });
  }
);

authRouter.get('/logout', logout);

export default authRouter;
