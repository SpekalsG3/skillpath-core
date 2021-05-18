const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class SkillAssociations extends Model {
  }

  SkillAssociations.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    first_skill_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    second_skill_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    count: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0',
    },
  }, {
    tableName: 'skill_associations',
    timestamps: false,
    sequelize: sequelize,
  });

  return SkillAssociations;
};
