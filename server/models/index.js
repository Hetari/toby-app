import { Sequelize } from 'sequelize';

// Create a Sequelize instance and connect to the MySQL database
// TODO: change it into postgressql
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

export default sequelize;
