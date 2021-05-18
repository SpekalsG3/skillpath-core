const { Specializations } = require('../index').models;

class SpecializationRepository {
  async getAll () {
    return await Specializations.findAll({});
  }

  async findByTitle ({ title }) {
    return await Specializations.findOne({
      where: {
        title,
      },
      raw: true,
      returning: true,
    });
  }
}

module.exports = new SpecializationRepository();
