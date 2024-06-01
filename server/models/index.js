import { Sequelize } from 'sequelize';
import config from '../configs/config.js';

// Create a Sequelize instance and connect to the Sqlite database
// TODO: change it into postgressql
const sequelize = new Sequelize(
  config.development.databaseName,
  config.development.username,
  config.development.password,
  config.development.options
);

export default sequelize;
