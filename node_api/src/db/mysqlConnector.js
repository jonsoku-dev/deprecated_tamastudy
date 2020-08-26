const mysql = require('mysql2/promise');
const db = require('./models');
const DB_USERNAME = process.env.DB_USERNAME;
const DB_DEV_PASSWORD = process.env.DB_DEV_PASSWORD;
const DB_PROD_PASSWORD = process.env.DB_PROD_PASSWORD;
const DB_DBNAME = process.env.DB_DBNAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const isProd = process.env.NODE_ENV === 'production';

mysql
  .createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USERNAME,
    password: isProd ? DB_PROD_PASSWORD : DB_DEV_PASSWORD,
  })
  .then((connection) => {
    connection
      .query(`CREATE DATABASE IF NOT EXISTS ${DB_DBNAME};`)
      .then(() => {
        console.info('Database create or successfully checked');
      })
      .then(() => {
        db.sequelize
          .sync()
          .then(() => {
            console.log(`🌟 DB 연결 성공!`);
          })
          .catch(console.error);
      })
      .catch((err) => {
        console.error(err);
        process.exit(0);
      });
  });
