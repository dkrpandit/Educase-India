const dotenv = require('dotenv');

const express = require('express')
// const router = require("../router/auth.router");
const app = express()
dotenv.config();
app.use(express.json());
// app.use(router);

/* ----------------  connecting databases  --------------------------- */
const mysql = require('mysql2');
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

/*--------------------------- routes --------------------------------*/

app.post("/addSchool", (req, res) => {
    console.log(req.body)
    const { name, address, latitude, longitude } = req.body;
    db.query('INSERT INTO schools (name,address,latitude,longitude) VALUES (?, ?, ?, ?)', [name, address, latitude, longitude], (err, result) => {
        if (err) throw err;
        res.json({ message: 'School added successfully', id: result.insertId });
    })
})

module.exports = app;