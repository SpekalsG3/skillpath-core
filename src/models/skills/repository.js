const { Skills, SkillSynonyms, SkillSpecializations } = require('../index').models;

class SkillsRepository {
  async findAll () {
    return await Skills.findAll({
      where: {
        is_enabled: true,
      },
      raw: true,
      returning: true,
    });
  }

  async findAllSynonyms ({ skill_id }) {
    return await SkillSynonyms.findAll({
      where: {
        skill_id,
      },
      raw: true,
      returning: true,
    });
  }

  async findByTitle ({ title }) {
    return await Skills.findOne({
      where: {
        title,
      },
      raw: true,
      returning: true,
    });
  }

  async findBySynonym ({ synonym }) {
    const skillsSynonym = await SkillSynonyms.findOne({
      where: {
        synonym,
      },
      include: Skills,
    });
    return skillsSynonym.Skill.dataValues;
  }

  async addSynonym ({ skill_id, synonym }) {
    await SkillSynonyms.create({
      skill_id,
      synonym,
    });
  }

  async addSpecialization ({ skill_id, specialization_id }) {
    await SkillSpecializations.create({
      skill_id,
      specialization_id,
    });
  }
}

module.exports = new SkillsRepository();
