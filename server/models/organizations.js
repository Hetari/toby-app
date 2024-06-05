import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import User from './users.js';
import OrganizationMember from './organizationMembers.js';

const Organization = sequelize.define('Organization', {
  title: {
    type: DataTypes.STRING,
  },
  // joinCode: {
  //   type: DataTypes.STRING,
  //   unique: true,
  // },
  creatorId: {
    type: DataTypes.INTEGER,
  },
});

User.belongsToMany(Organization, {
  foreignKey: 'organizationId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  through: OrganizationMember,
});

//
User.hasMany(Organization, {
  as: 'CreatedOrganizations',
  foreignKey: 'creatorId',
});

Organization.belongsToMany(User, {
  through: OrganizationMember,
  foreignKey: 'organizationId',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

//
Organization.belongsTo(User, {
  as: 'creator',
  foreignKey: 'creatorId',
});

OrganizationMember.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Organization;
