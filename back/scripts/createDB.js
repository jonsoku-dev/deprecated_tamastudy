require('dotenv').config()
const mysql = require('mysql2/promise');

const dbName = process.env.DB_DEV || "tama_dev";

mysql.createConnection({
    host: process.env.DB_USERNAME || "127.0.0.1",
    port: process.env.DB_PORT || "3306",
    user     : process.env.DB_USER || "root",
    password : process.env.DB_PASSWORD,
}).then( connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
        console.info("Database create or successfully checked");
        process.exit(0);
    })
})