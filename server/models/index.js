import Sequelize from 'sequelize';

// let sequelize = new Sequelize(
//   `${process.env.DB_NAME}`,
//   `${process.env.DB_USERNAME}`,
//   `${process.env.DB_PASSWORD}`,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//   }
// );

let sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sequelize.sqlite',
});

export default sequelize;
