const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Specialization extends Model {
  }

  Specialization.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'specializations',
    timestamps: false,
    sequelize: sequelize,
  });

  return Specialization;
};
