const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Skill extends Model {
  }

  Skill.init({
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
    tableName: 'skills',
    timestamps: false,
    sequelize: sequelize,
  });

  return Skill;
};
