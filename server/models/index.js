import Sequelize from 'sequelize';

let sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
});

export default sequelize;
