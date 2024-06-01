import passport from 'passport';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/users.js';

const register = async (req, res) => {
  // TODO: add normal register logic here
  return res.send('Register controller');
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // TODO: custom error
    throw new Error('All fields are required');
  }

  // if (password.length < 8) {
  //   throw new Error('Password must be at least 8 characters long');
  // }

  // Generate a salt for hashing passwords with cost factor 10, it is basically random bytes
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  User.create({
    email,
    password: encryptedPassword,
  });

  return res.status(StatusCodes.CREATED).json({
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
