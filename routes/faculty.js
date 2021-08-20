const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const teacherControllelr = require("../controllers/faculty");

router.post(
    "/createTeacher",
    body("teacherName")
        .matches(/^[a-z ]+$/i)
        .withMessage("Field can only contain alphabets!")
        .trim(),
    body("position")
        .matches(/^[a-z ]+$/i)
        .withMessage("Field can only contain alphabets!")
        .trim(),
    body("teacherDepartment")
        .matches(/^[a-z ]+$/i)
        .withMessage("Field can only contain alphabets!")
        .trim(),
    teacherControllelr.createTeacher
);

module.exports = router;
