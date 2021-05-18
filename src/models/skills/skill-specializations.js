const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class SkillSpecializations extends Model {
  }

  SkillSpecializations.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    skill_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    specialization_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    tableName: 'skill_specializations',
    timestamps: false,
    sequelize: sequelize,
  });

  return SkillSpecializations;
};
