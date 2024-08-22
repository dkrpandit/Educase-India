const db = require("../db/databases")
const addSchool = async (req, res) => {
    console.log(req.body)
    const { name, address, latitude, longitude } = req.body;
    db.query('INSERT INTO schools (name,address,latitude,longitude) VALUES (?, ?)', [name, address, latitude, longitude], (err, result) => {
        if (err) throw err;
        res.json({ message: 'School added successfully', id: result.insertId });
    });

};

module.exports = { addSchool };