const { Sources } = require('../index').models;

class SourcesRepository {
  async findEnabled () {
    return await Sources.findAll({
      where: {
        is_enabled: true,
      },
      raw: true,
    });
  }

  async findByTitle ({ title }) {
    return await Sources.findOne({
      where: {
        title,
      },
      raw: true,
      returning: true,
    });
  }

  async updateLastConfig ({ adapter_id, last_config }) {
    await Sources.update({
      last_config,
    }, {
      where: {
        id: adapter_id,
      },
    });
  }
}

module.exports = new SourcesRepository();
