import passport from 'passport';
import bcrypt from 'bcrypt';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import User from '../models/users.js';
import generateToken from '../functions/index.js';
import cookie from 'cookie';

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  // if (password.length < 8) {
  //   throw new BadRequestError('Password must be at least 8 characters long');
  // }

  // Generate a salt for hashing passwords with cost factor 10, it is basically random bytes
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      email,
      password: encryptedPassword,
    });

    //  TODO: send the token into the frontend
    const token = generateToken(user.id, email);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  }

  return res.status(StatusCodes.CREATED).json({
    done: true,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  let token = null;

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(ReasonPhrases.UNAVAILABLE_FOR_LEGAL_REASONS);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(ReasonPhrases.UNAVAILABLE_FOR_LEGAL_REASONS);
    }

    token = generateToken(user.id, email);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  }

  // send the token into the frontend
  return res
    .status(StatusCodes.CREATED)
    .setHeader(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      })
    )
    .json({
      done: true,
    });
};

const googleAuth = passport.authenticate('google', {
  scope: ['profile'],
});

const logout = async (req, res) => {
  return res.send('Logout...');
};

export { register, login, googleAuth, logout };
