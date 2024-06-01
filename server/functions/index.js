import jsonwebtoken from 'jsonwebtoken';

const generateToken = (userId, email) =>
  jsonwebtoken.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
    header: { typ: 'JWT', alg: 'HS256' },
  });

export default generateToken;
