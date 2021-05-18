const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class SkillSynonyms extends Model {
  }

  SkillSynonyms.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    skill_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    synonym: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'skill_synonyms',
    timestamps: false,
    sequelize: sequelize,
  });

  return SkillSynonyms;
};
