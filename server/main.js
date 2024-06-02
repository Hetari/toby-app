import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';

// Extra security packages
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import { rateLimit } from 'express-rate-limit';

// import DB
import User from './models/users.js';
import Site from './models/sites.js';
import Collection from './models/collections.js';
import sequelize from './models/index.js';

// import routes
import authRouter from './routes/authRoute.js';

// TODO: import middleware
import authMiddleware from './middleware/authMiddleware.js';

// create app
const app = express();
dotenv.config();

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

const corsConfig = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

// using middlewares
app.set('trust proxy', 1);
app.use(express.json());
app.use(helmet());
app.use(cors(corsConfig));
app.use(xss());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// app.use(limiter);

// using routes
app.use('/api/v1/auth', authRouter);

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// start the server
const serverStart = async () => {
  try {
    await sequelize.sync({
      force: true,
      alter: true,
      // logging: false,
    });
    console.info('Database connected...');

    const port = process.env.PORT || 3000;
    const host = process.env.HOST || 'localhost';

    app.listen(port, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit process with failure
  }
};

serverStart();
