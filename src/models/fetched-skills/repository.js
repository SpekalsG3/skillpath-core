const { sequelize, models } = require('../index');
const { FetchedSkills, SkillAssociations } = models;

class FetchedSkillsRepository {
  async saveFetchedSkills ({ source, vacancies }) {
    for (const vacancy of vacancies) {
      for (let i = 0; i < vacancy.skills.length; i++) {
        const skill = vacancy.skills[i];

        const duplicateSkill = await FetchedSkills.findOne({
          where: {
            source_id: source.id,
            skill_id: skill.id,
          },
          raw: true,
          returning: true,
        });

        if (duplicateSkill) {
          await FetchedSkills.update({
            count: String(Number(duplicateSkill.count) + 1),
          }, {
            where: {
              source_id: source.id,
              skill_id: skill.id,
            },
          });
        } else {
          await FetchedSkills.create({
            source_id: source.id,
            skill_id: skill.id,
            count: 1,
          });
        }

        for (let j = i + 1; j < vacancy.skills.length; j++) {
          const associatedSkill = vacancy.skills[j];
          const flippedPair = skill.id < associatedSkill.id
            ? {
              first_skill_id: skill.id,
              second_skill_id: associatedSkill.id,
            }
            : {
              first_skill_id: associatedSkill.id,
              second_skill_id: skill.id,
            };

          const duplicateAssociation = await SkillAssociations.findOne({
            where: flippedPair,
            raw: true,
            returning: true,
          });

          if (duplicateAssociation) {
            await SkillAssociations.update({
              count: Number(duplicateAssociation.count) + 1,
            }, {
              where: flippedPair,
            });
          } else {
            await SkillAssociations.create({
              ...flippedPair,
              count: 1,
            });
          }
        }
      }
    }
  }
}

module.exports = new FetchedSkillsRepository();
