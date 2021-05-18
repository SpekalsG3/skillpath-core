require('dotenv').config();

const SkillsRepository = require('../src/models/skills/repository');

// eslint-disable-next-line require-await
(async () => {
  console.log(await SkillsRepository.findBySynonym({ synonym: 'symfony4' }));
})();
