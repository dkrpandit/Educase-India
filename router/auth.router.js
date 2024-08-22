const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth.controllers");

router.route("/addSchool").post(controller.addSchool);


module.exports = router;