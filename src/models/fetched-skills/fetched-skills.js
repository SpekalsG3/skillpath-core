const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class FetchedSkills extends Model {
  }

  FetchedSkills.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    skill_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    source_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    count: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0',
    },
  }, {
    tableName: 'fetched_skills',
    timestamps: false,
    sequelize: sequelize,
  });

  return FetchedSkills;
};
