const Mutex = require('named-mutex');
const FetchedSkillsRepository = require('../models/fetched-skills/repository');
const SourcesRepository = require('../models/sources/repository');

const { adaptersMap } = require('../adapters');

const SKILLS_UPDATER_MUTEX = 'skills-updater';

class SkillsUpdater {
  constructor (logger) {
    this.logger = logger;
  }

  async updateAll () {
    const mutex = new Mutex(SKILLS_UPDATER_MUTEX);
    if (!mutex.tryLock()) {
      this.logger.warn('Skills-updater job is running. Aborting...');
      return;
    }
    this.logger.debug('Starting skills-updater job...');

    const start = Date.now();

    const supportedAdapters = await SourcesRepository.findEnabled();

    const vacancies = {};
    for (const adapter of supportedAdapters) {
      if (adaptersMap[adapter.title] && adaptersMap[adapter.title].getVacancies) {
        let config;
        if (adapter.last_config) {
          config = adaptersMap[adapter.title].updateConfig(adapter.last_config);
        } else {
          config = adapter.default_config;
        }

        vacancies[adapter.title] = await adaptersMap[adapter.title].getVacancies(config);

        await SourcesRepository.updateLastConfig({
          adapter_id: adapter.id,
          last_config: config,
        });
      } else {
        this.logger.error(`HALT! Adapter '${adapter.title}' has no 'getVacancies' method`);
      }
    }

    for (const adapterName in vacancies) {
      const parsedVacancies = await adaptersMap[adapterName].parseVacancies(vacancies[adapterName]);
      const source = await SourcesRepository.findByTitle({ title: adapterName });
      await FetchedSkillsRepository.saveFetchedSkills({
        source: source,
        vacancies: parsedVacancies,
      });
    }

    this.logger.info(`Updated skills in ${((Date.now() - start) / 1000).toFixed(2)}s`);
    mutex.unLock();
  }
}

module.exports = SkillsUpdater;
