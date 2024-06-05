import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import User from './users.js';

const Organization = sequelize.define('Organization', {
  name: {
    type: DataTypes.STRING,
  },
});

Organization.belongsTo('User', {
  foreignKey: 'ownerId',
  as: 'owner',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// export default Organization;
