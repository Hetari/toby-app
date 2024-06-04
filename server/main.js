import 'express-async-errors';
// import dotenv from 'dotenv';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import passport from './configs/passport.config.js';

// Extra security packages
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import { rateLimit } from 'express-rate-limit';

// import logs
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

// import DB
// import User from './models/users.js';
// import Site from './models/sites.js';
// import Collection from './models/collections.js';
import sequelize from './models/index.js';

// import routes
import authRouter from './routes/authRoute.js';
import tabRouter from './routes/tabRoute.js';

import authMiddleware from './middleware/authMiddleware.js';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import collectionRouter from './routes/collectionRouter.js';
import tagRouter from './routes/tagRoute.js';

// create app
const app = express();

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

// create and defined the absolute path in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the log directory path
const logDirectory = path.join(__dirname, 'log');

// Ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Create a write stream (in append mode) for access.log in the log directory
const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, 'access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));

app.set('trust proxy', 1);
app.use(express.json());
app.use(helmet());
app.use(cors(corsConfig));
app.use(xss());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true },
  })
);

// app.use(limiter);

// initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// using routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tab', authMiddleware, tabRouter);
app.use('/api/v1/collection', authMiddleware, collectionRouter);
app.use('/api/v1/tag', authMiddleware, tagRouter);

app.post('/api/v1/is-logged-in', authMiddleware, (req, res) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: ReasonPhrases.OK,
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// start the server
const serverStart = async () => {
  try {
    await sequelize.sync({
      alter: true,
      force: !true,
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
