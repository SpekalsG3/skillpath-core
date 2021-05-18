const SourcesRepository = require('../models/sources/repository');
const HH = require('./hh');

const adaptersMap = {
  HeadHunter: HH,
};

const getSupportedAdapters = async () => await SourcesRepository.findEnabled();

const callAll = async (method, data, callback) => {
  const adapters = await getSupportedAdapters();

  const promises = adapters.filter((adapter) => {
    return adaptersMap[adapter.title] && adaptersMap[adapter.title][method];
  }).map(async adapter => {
    try {
      const response = await adaptersMap[adapter.title][method](data);
      if (callback) {
        await callback();
      }
      if (response) {
        return {
          [adapter.title]: data,
        };
      }
    } catch (e) {
      this.logger.error(`Unexpected error calling ${adapter.title} for ${method}: ${e.message}`);
    }
    return null;
  });

  const response = await Promise.all(promises);

  return response.reduce((acc, current) => Object.assign(acc, current || {}), {});
};

module.exports = {
  adaptersMap,
  callAll,
};
