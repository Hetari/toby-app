import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const TagCollection = sequelize.define('TagCollection', {
  // Additional fields can be added here if needed
});

export default TagCollection;
