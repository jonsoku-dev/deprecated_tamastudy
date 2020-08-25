require('dotenv').config({path: '../../.env'});
const DB_USERNAME = process.env.DB_USERNAME;
const DB_DEV_PASSWORD = process.env.DB_DEV_PASSWORD;
const DB_TEST_PASSWORD = process.env.DB_TEST_PASSWORD;
const DB_PROD_PASSWORD = process.env.DB_PROD_PASSWORD;
const DB_DBNAME = process.env.DB_DBNAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_DEV_PASSWORD,
    database: DB_DBNAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: DB_USERNAME,
    password: DB_TEST_PASSWORD,
    database: DB_DBNAME,
    host: DB_HOST,
    dialect: 'mysql',
  },
  production: {
    username: DB_USERNAME,
    password: DB_PROD_PASSWORD,
    database: DB_DBNAME,
    host: DB_HOST,
    dialect: 'mysql',
  },
};
