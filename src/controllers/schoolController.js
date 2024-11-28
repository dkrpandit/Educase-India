const db = require('../config/db');
const { calculateDistance } = require('../utils/helpers');

const addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    const checkQuery = 'SELECT * FROM schools WHERE name = ?';
    db.query(checkQuery, [name], (err, results) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error' });
        if (results.length > 0) return res.status(409).json({ message: 'School already exists' });

        const insertQuery = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [name, address, latitude, longitude], (err, result) => {
            if (err) return res.status(500).json({ message: 'Internal Server Error' });
            res.status(201).json({ message: 'School added successfully', id: result.insertId });
        });
    });
};

const listSchools = (req, res) => {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) return res.status(400).json({ message: 'Latitude and Longitude required' });

    db.query('SELECT * FROM schools', (err, results) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error' });

        results.forEach(school => {
            school.distance_km = calculateDistance(latitude, longitude, school.latitude, school.longitude).toFixed(2);
        });

        results.sort((a, b) => a.distance_km - b.distance_km);
        res.json(results);
    });
};

module.exports = { addSchool, listSchools };
