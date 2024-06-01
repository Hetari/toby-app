import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js';

class Collection extends Model {}

Collection.init({});

export default Collection;
