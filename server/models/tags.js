import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import Collection from './collections.js';
import TagCollection from './TagCollection.js';
import User from './users.js';

const Tag = sequelize.define('tag', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Tag.belongsTo(User, {
  foreignKey: 'userId',
});

Tag.belongsToMany(Collection, {
  through: TagCollection,
});

Collection.belongsToMany(Tag, {
  through: TagCollection,
});

export default Tag;
