import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js';

class User extends Model {}

// Define the User model
// const User = sequelize.define(
//   'User',
User.init(
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },

    email: {
      // Allow null for OAuth users
      unique: true,
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      // Allow null for OAuth users
      allowNull: true,
    },

    provider: {
      type: DataTypes.STRING,
      // Nullable for non-OAuth users
      allowNull: true,
    },

    providerId: {
      type: DataTypes.STRING,
      // Nullable for non-OAuth users
      allowNull: true,
      // Ensure unique IDs for OAuth users
      unique: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    sequelize: sequelize,
    modelName: 'User',
    timestamps: true,
    // hooks: {
    //   beforeUpdate: (user) => {
    //     user.updatedAt = new Date();
    //   },
    // },
  }
);

// );

export { User };
