import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import Collection from './collections.js';

const Site = sequelize.define(
  'site',
  {
    title: {
      type: DataTypes.STRING,
    },

    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'Invalid URL',
        },
      },
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    customTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    customDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: 'Site',
    timestamps: true,
  }
);

// Define the relationship between Site and Collection
// Site belongs to Collection
Site.belongsTo(Collection, {
  foreignKey: 'collectionId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// Define the inverse relationship
Collection.hasMany(Site, {
  foreignKey: 'collectionId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Site;
