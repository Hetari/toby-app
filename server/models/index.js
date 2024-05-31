import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    databaseName: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
      // logging: false,
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    },
  },
  test: {
    databaseName: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    },
  },

  production: {
    databaseName: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
      logging: false,
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    },
  },
};

const configuration = process.env.NODE_ENV;

// Create a Sequelize instance and connect to the Sqlite database
// TODO: change it into postgressql
const sequelize = new Sequelize(
  config.development.databaseName,
  config.development.username,
  config.development.password,
  config.development.options
);

export default sequelize;
