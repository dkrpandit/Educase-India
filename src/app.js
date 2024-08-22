const dotenv = require('dotenv');
const express = require('express')
const app = express()
dotenv.config();
app.use(express.json());

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

// Helper function to calculate distance using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// Endpoint to list schools sorted by proximity
app.get('/listSchools', (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and Longitude are required' });
    }

    // Fetch all schools from the database
    db.query('SELECT * FROM schools', (err, results) => {
        if (err) {
            console.error('Error fetching schools:', err.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Calculate distance and sort schools
        results.forEach(school => {
            school.distance_km = calculateDistance(latitude, longitude, school.latitude, school.longitude).toFixed(2);
        });

        results.sort((a, b) => a.distance_km - b.distance_km);

        res.json(results);
    });
});

module.exports = app;