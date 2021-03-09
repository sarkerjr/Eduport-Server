const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const teacherControllelr = require("../controllers/teacher");

router.post("/createTeacher", teacherControllelr.createTeacher);

module.exports = router;