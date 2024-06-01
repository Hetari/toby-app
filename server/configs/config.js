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

export default config;
