const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Source extends Model {
  }

  Source.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    api_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    default_config: {
      type: DataTypes.JSON,
    },
    last_config: {
      type: DataTypes.JSON,
    },
  }, {
    tableName: 'sources',
    timestamps: false,
    sequelize: sequelize,
  });

  return Source;
};
