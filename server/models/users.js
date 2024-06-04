import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const User = sequelize.define(
  'user',
  {
    profilePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      // Allow null for OAuth users
      type: 'string',
      allowNull: true,
    },

    email: {
      unique: true,
      type: DataTypes.STRING,
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
    modelName: 'User',
    timestamps: true,
  }
);

export default User;
