require("dotenv").config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PROD_PASSWORD = process.env.DB_PROD_PASSWORD;
const DB_DEV = process.env.DB_DEV;
const DB_TEST = process.env.DB_TEST;
const DB_PROD = process.env.DB_PROD;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DEV,
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_TEST,
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PROD_PASSWORD,
    database: DB_PROD,
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
