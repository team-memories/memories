require("dotenv").config();
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DEV_DB,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PW,
    },
    seeds: {
      directory: "./seeds",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: process.env.DB,
      user: process.env.DB_USER,
      password: process.env.DB_PW,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
