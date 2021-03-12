const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const studentController = require("../controllers/student");

const Student = require("../models/Student");
const StudentProfile = require("../models/StudentProfile");

router.post(
    "/createStudent",
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
            for (b of bloodTypes) {
                if (req.body.bloodGroup == b) return true;
            }
            throw new Error("Blood group not exist!");
        }),
    studentController.createStudent
);

router.get("/getStudents", studentController.getStudents);

router.post(
    "/newSudentProfile",
    body("studentNo").custom((value, { req }) => {
        return StudentProfile.findOne({ where: { studentNo: value } }).then(
            (result) => {
                if (result) {
                    return Promise.reject("Student ID already exists!");
                }
            }
        );
    }),
    body("studentEmail")
        .isEmail()
        .withMessage("Please enter a valid email.")
        .custom((value, { req }) => {
            return StudentProfile.findOne({ where: { email: value } }).then(
                (result) => {
                    if (result) {
                        return Promise.reject("E-Mail address already exists!");
                    }
                }
            );
        })
        .normalizeEmail(),
    body("studentPassword")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password minimum length: 6"),
    studentController.createStudentProfile
);

//Get currently login user profile
router.get("/profile", studentController.getStudentProfile);

//Get currently login user profile
router.get("/profile/results", studentController.getResults);

module.exports = router;
