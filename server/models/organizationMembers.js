import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const OrganizationMember = sequelize.define('member', {});

// member.belongsTo(User, {
//   foreignKey: 'userId',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

export default OrganizationMember;
