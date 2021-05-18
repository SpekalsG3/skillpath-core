require('dotenv').config();

const SkillsRepository = require('../src/models/skills/repository');
const SpecializationsRepository = require('../src/models/specializations/repository');
const skills = require('../src/resources/skills');
const specializations = require('../src/resources/specializations');

(async () => {
  for (const skill of skills) {
    const dbSkill = await SkillsRepository.findByTitle({ title: skill.name });
    for (const synonym of skill.synonyms) {
      await SkillsRepository.addSynonym({
        skill_id: dbSkill.id,
        synonym,
      });
    }
  }

  for (const specialization of specializations) {
    const dbSpecialization = await SpecializationsRepository.findByTitle({ title: specialization.en });
    for (const skill of specialization.skills) {
      const dbSkill = await SkillsRepository.findByTitle({ title: skills[skill].name });
      await SkillsRepository.addSpecialization({
        skill_id: dbSkill.id,
        specialization_id: dbSpecialization.id,
      });
    }
  }
  console.log('success');
})();
