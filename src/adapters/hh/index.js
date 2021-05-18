const axios = require('axios');
const SkillsRepository = require('../../models/skills/repository');
const Interface = require('../interface');
const Logger = require('../../utils/logger');
const config = require('../../config/index');
const { escapeRegExp } = require('../../utils/regexp-helpers');

class HH extends Interface {
  constructor () {
    super();
    this.logger = new Logger('HH-ADAPTER');
    this.api = axios.create({
      baseURL: config.adapters.hh.apiUrl,
    });
  }

  parseSkillsFromString (str) {
    return str
      .replace(/[^a-zA-Z0-9-#+ ]/gim, ' ')
      .match(this.skillsRegexp);
  }

  async parseSkills (string) {
    const parsedSynonyms = this.parseSkillsFromString(string);
    if (!parsedSynonyms) {
      return [];
    }

    const parsedSkills = [];
    for (const synonym of parsedSynonyms) {
      if (synonym) {
        const skill = await SkillsRepository.findBySynonym({
          synonym: synonym.toLowerCase(),
        });

        const duplicate = parsedSkills.find(s => s.title === skill.title);
        if (!duplicate) {
          parsedSkills.push(skill);
        }
      }
    }

    return [...parsedSkills]; // cast Set to Array
  }

  async updateSkillsRegexp () {
    const skills = await SkillsRepository.findAll();
    let sortedLowerCasedSkills = [];

    for (const skill of skills) {
      const synonyms = await SkillsRepository.findAllSynonyms({ skill_id: skill.id });
      sortedLowerCasedSkills = sortedLowerCasedSkills.concat(
        synonyms.reduce((total, synonym) => total.concat(synonym.synonym.toLowerCase()), []),
      );
    }
    const regexpString = sortedLowerCasedSkills
      .sort((a, b) => b.length - a.length)
      .map(el => escapeRegExp(el)).join('|');

    this.skillsRegexp = new RegExp(`(${regexpString})`, 'gim');
  }

  async corsAnywhereRequest (url) {
    const { data } = await this.api.get(`${config.corsAnywhereApiUrl}${url}`);
    return data;
  }

  async parseVacancies (items) {
    await this.updateSkillsRegexp();

    const promises = items.map(item => axios.get(item.url));

    const result = await Promise.all(promises);

    let count = 0;
    const skillPerVacancy = [];
    for (const { data } of result) {
      const parsedSkills = await this.parseSkills(data.description);

      count += parsedSkills.length;
      skillPerVacancy.push({
        skills: parsedSkills,
      });
    }

    this.logger.debug(`Parsed total of ${count} skills`);
    return skillPerVacancy;
  }

  async getVacancies ({ specialization, archived, per_page, page }) {
    const startTime = new Date();

    const { data } = await this.api.get(`vacancies?specialization=${specialization}&archived=${archived}&per_page=${per_page}&page=${page}`);

    this.logger.info(`Got ${data.items.length} items in: ${(new Date().valueOf() - startTime) / 60}s`);

    return data.items;
  }

  updateConfig ({ specialization, archived, per_page, page }) {
    return {
      specialization,
      archived,
      per_page,
      page: page + 1,
    };
  }
}

module.exports = new HH();
