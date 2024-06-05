import passport from 'passport';
import bcrypt from 'bcrypt';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import User from '../models/users.js';
import generateToken from '../functions/index.js';

const register = async (req, res) => {
  const { email, password, username } = req.body;
  const profilePath = req.file.path;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: ReasonPhrases.BAD_REQUEST,
    });
  }

  // Generate a salt for hashing passwords with cost factor 10, it is basically random bytes
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  let token = null;
  try {
    const user = await User.create({
      username,
      email,
      profilePath,
      password: encryptedPassword,
    });

    token = generateToken(user.id, email);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: ReasonPhrases.CONFLICT,
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      });
    }
  }

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: ReasonPhrases.ACCEPTED,
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: ReasonPhrases.BAD_REQUEST,
    });
  }

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(ReasonPhrases.UNAUTHORIZED);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(ReasonPhrases.UNAUTHORIZED);
    }

    const token = generateToken(user.id, email);
    // send the token into the frontend
    return res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: ReasonPhrases.ACCEPTED,
      token,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: ReasonPhrases.CONFLICT,
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      });
    }
  }
};

const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

// Handles the callback after Google has authenticated the user
export const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.redirect('/login'); // Redirect to login page if authentication fails
    }

    // If authentication is successful, the token is attached to the request
    const token = req.token;

    // Redirect to the frontend with the token as a query parameter
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  })(req, res, next);
};

const logout = async (req, res) => {
  return res.send('Logout...');
};

export { register, login, googleAuth, logout };
