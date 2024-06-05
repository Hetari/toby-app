import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const member = sequelize.define('member', {
  name: {
    type: DataTypes.STRING,
  },
});

member.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

member.belongsTo(Organization, {
  foreignKey: 'organizationId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default member;
