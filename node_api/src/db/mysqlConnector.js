const mysql = require('mysql2/promise');
const db = require('./models');
const DB_USERNAME = process.env.DB_USERNAME;
const DB_DEV_PASSWORD = process.env.DB_DEV_PASSWORD;
const DB_PROD_PASSWORD = process.env.DB_PROD_PASSWORD;
const DB_DBNAME = process.env.DB_DBNAME;

const isProd = process.env.NODE_ENV === 'production';

mysql
  .createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '3306',
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
