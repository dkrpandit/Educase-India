const dotenv = require('dotenv');

const express = require('express')
const router = require("../router/auth.router");
const mysql = require('mysql2');
const app = express()
dotenv.config();
app.use(router);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = app;