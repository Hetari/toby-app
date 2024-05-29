// import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';

// Extra security packages
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import { rateLimit } from 'express-rate-limit';

// TODO: import DB

// TODO: import error handler

// import routes
import authRouter from './routes/auth.js';

// TODO: import middleware

const limiter = rateLimit({
  // 15 minutes
  windowMs: 15 * 60 * 1000,
  // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  limit: 100,
  // draft-6: `RateLimit-*` headers;
  // draft-7: combined `RateLimit` header
  standardHeaders: 'draft-7',
  // Disable the `X-RateLimit-*` headers.
  legacyHeaders: false,
});

// create app
dotenv.config();
const app = express();

// using middlewares
app.set('trust proxy', 1);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
// app.use(limiter);

// using routes
app.use('/api/v1/auth', authRouter);

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// start the server
const serverStart = () => {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';

  app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
};

serverStart();
