const { Sequelize } = require('sequelize');
const { database } = require('../config');

const initSkills = require('./skills/skills');
const initSkillSynonyms = require('./skills/skill-synonyms');
const initSkillSpecializations = require('./skills/skill-specializations');
const initSources = require('./sources/sources');
const initSpecializations = require('./specializations/specializations');
const initFetchedSkills = require('./fetched-skills/fetched-skills');
const initSkillAssociations = require('./fetched-skills/skill-associations');

const sequelize = new Sequelize(database.name, database.user, database.password, database);

const models = {
  Skills: initSkills(sequelize),
  SkillSynonyms: initSkillSynonyms(sequelize),
  SkillSpecializations: initSkillSpecializations(sequelize),
  Sources: initSources(sequelize),
  Specializations: initSpecializations(sequelize),
  FetchedSkills: initFetchedSkills(sequelize),
  SkillAssociations: initSkillAssociations(sequelize),
};

models.SkillSynonyms.belongsTo(models.Skills, { foreignKey: 'skill_id' });
models.SkillSpecializations.belongsTo(models.Skills, { foreignKey: 'skill_id' });
models.SkillSpecializations.belongsTo(models.Specializations, { foreignKey: 'specialization_id' });
models.FetchedSkills.belongsTo(models.Skills, { foreignKey: 'skill_id' });
models.FetchedSkills.belongsTo(models.Sources, { foreignKey: 'source_id' });
models.SkillAssociations.belongsTo(models.Skills, { foreignKey: 'first_skill_id' });
models.SkillAssociations.belongsTo(models.Skills, { foreignKey: 'second_skill_id' });

module.exports = {
  models,
  sequelize,
};
