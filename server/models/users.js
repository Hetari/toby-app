const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Import the sequelize instance

// Define the User model
// Define the User model
const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

    accessToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
    hooks: {
      beforeUpdate: (user) => {
        user.updatedAt = new Date();
      },
    },
  }
);

export default User;
