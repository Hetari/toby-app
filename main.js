import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';

// Extra security packages
import helmet from 'helmet';
import cors from 'cors';

// TODO: import DB

// TODO: import error handler

// TODO: import routes

// TODO: import middleware

// create app
dotenv.config();
const app = express();

// using middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());

// TODO: using routes

// start the server
const serverStart = () => {
  const port = process.env.PORT || 5173;
  const host = process.env.HOST || 'localhost';

  app.listen(port, host, () => {
    console.info(`Server is running on http://${host}:${port}`);
  });
};

serverStart();
