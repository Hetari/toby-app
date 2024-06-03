import { Router } from 'express';
import {
  register,
  login,
  googleAuth,
  logout,
} from '../controllers/authController.js';
import passport from 'passport';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import generateToken from '../functions/index.js';

const authRouter = Router();

// it is obviously much better to encapsulate them into a POST request

authRouter.post('/register', register);
authRouter.post('/login', login);

authRouter.get('/google', googleAuth);

authRouter.get(
  '/google/redirect',
  (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: ReasonPhrases.UNAUTHORIZED,
        });
      }

      // If authentication is successful, the token is attached to the request
      const token = generateToken(user.id, user.email);

      // Redirect to the frontend with the token as a query parameter
      // res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
      return res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
      // .status(StatusCodes.OK)
      // .json({
      //   success: true,
      //   message: ReasonPhrases.OK,
      //   token,
      // });
    })(req, res, next);
  }
  // passport.authenticate('google', {
  //   successRedirect: process.env.FRONTEND_URL,
  //   access_type: 'offline',
  //   scope: ['email', 'profile'],
  // })
  // ,
  // (req, res) => {
  //   console.log();
  //   console.log();
  //   console.error("You");
  //   console.log();
  //   console.log();
  //   if (!req.user) {
  //     return res.status(StatusCodes.UNAUTHORIZED).json({
  //       success: false,
  //       message: ReasonPhrases.UNAUTHORIZED,
  //     });
  //   }

  //   return res.status(StatusCodes.OK).json({
  //     success: true,
  //     message: ReasonPhrases.OK,
  //     token,
  //   });
  // }
);

authRouter.get('/logout', logout);

export default authRouter;
