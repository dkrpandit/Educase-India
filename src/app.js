const express = require('express')
const router = require("../router/auth.router");
const app = express()
app.use(router);
app.get("/", (req, res) => {
    res.send("Hello world")
})

module.exports = app;