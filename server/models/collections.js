import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js';
import User from './users.js';

const Collection = sequelize.define(
  'Collection',
  {
    title: {
      type: DataTypes.STRING,
    },
    isStared: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    modelName: 'Collection',
    timestamps: true,
  }
);

Collection.belongsTo(User, {
  foreignKey: 'userId',
  // onDelete: 'CASCADE',
  // onUpdate: 'CASCADE',
});

User.hasMany(Collection, {
  foreignKey: 'userId',
  // onDelete: 'CASCADE',
  // onUpdate: 'CASCADE',
});

export default Collection;
