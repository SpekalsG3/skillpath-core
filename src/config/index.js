const ssl = process.env.PG_SSL === 'true';

module.exports = {
  corsAnywhereApiUrl: process.env.CORS_ANYWHERE,
  database: {
    user: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    name: process.env.PG_DB_NAME,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    logging: false,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    ssl,
    dialectOptions: {
      ssl,
    },
  },
  adapters: {
    hh: {
      apiUrl: process.env.HH_API_URL,
    },
  },
};
