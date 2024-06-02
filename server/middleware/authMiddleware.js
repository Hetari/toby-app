import jsonwebtoken from 'jsonwebtoken';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import User from '../models/users.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: ReasonPhrases.UNAUTHORIZED,
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { id: payload.userId } });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: ReasonPhrases.UNAUTHORIZED,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: ReasonPhrases.UNAUTHORIZED,
    });
  }
};

export default authMiddleware;
