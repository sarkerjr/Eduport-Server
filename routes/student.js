const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const studentController = require("../controllers/student");

router.post(
    "/createStudent",
    body("studentName")
        //Only letters and spaces allowd
        .custom((value, { req }) => {
            for (let s of req.body.studentName) {
                if (
                    !(
                        (65 <= s.charCodeAt() && s.charCodeAt() <= 90) ||
                        (97 <= s.charCodeAt() && s.charCodeAt() <= 122) ||
                        s.charCodeAt() == 32
                    )
                )
                    throw new Error("Name can only contain letters");
            }
            return true;
        })
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
            for (b of bloodTypes) {
                if (req.body.bloodGroup == b) return true;
            }
            throw new Error("Blood group not exist!");
        }),
    studentController.createStudent
);

router.get("/getStudents", studentController.getStudents);

module.exports = router;
