const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const studentController = require("../controllers/student");
const Student = require("../models/Student");

router.post(
    "/create",
    body("studentName")
        .matches(/^[a-z ]+$/i)
        .withMessage("Field can only contain alphabets!")
        .trim(),
    body("studentId")
        .isAlphanumeric()
        .isLength({ min: 8, max: 8 })
        .trim()
        .withMessage("Student ID format: 16ETE001"),
    body("session")
        .isLength({ min: 9, max: 9 })
        .trim()
        .withMessage("Session format: 2000-2001"),
    body("dateOfBirth")
        .isDate({ strictMode: true })
        .withMessage("Date format: YYYY/MM/DD")
        .trim(),
    body("hall").trim(),
    body("bloodGroup")
        .trim()
        .custom((value, { req }) => {
            const bloodTypes = [
                "A+",
                "B+",
                "AB+",
                "O+",
                "A-",
                "B-",
                "AB-",
                "O-",
            ];
            for (let b of bloodTypes) {
                if (req.body.bloodGroup == b) return true;
            }
            throw new Error("Blood group not exist!");
        }),
    studentController.createStudent
);

router.post("/createDetails", studentController.createStudentDetails);

module.exports = router;
