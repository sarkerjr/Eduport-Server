const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const Student = require("../models/Student");
const User = require("../models/UserAccount");

const studentController = require("../controllers/student");

router.post(
    "/create",
    body("userId")
    .isNumeric()
    .custom(value => {
        return User.findOne({where: { id: value }}).then(user => {
            // if (!user) return Promise.reject("User do not exist.");
            if (!user) return Promise.reject("User do not exist.");
        });
    }),
    body("studentName")
        .matches(/^[a-z ]+$/i)
        .withMessage("Field can only contain alphabets!")
        .trim(),
    body("studentId")
        .trim()
        .isLength({ min: 8, max: 11 })
        .withMessage("Student ID invalid.")
        .custom(value => {
            return Student.findOne({where: { studentId: value }}).then(student => {
                if (student) return Promise.reject("Student ID already exist.");
            });
        }),
    body("gender").isIn("MALE", "FEMALE", "OTHERS"),
    body("department").isAlpha(),
    body("session")
        .isLength({ min: 9, max: 9 })
        .trim()
        .withMessage("Session format: 2000-2001"),
    body("hall")
        .isIn([
            "Shadhinota Dibos Hall",
            "Bijoy Dibos Hall",
            "Bangamata Sheikh Fazilatunnesa Mujib Hall",
            "New Girls Hall",
            "Sheikh Rasel Hall",
            "Sheikh Rehana Hall",
        ])
        .trim(),
    studentController.createStudent
);

router.post("/create/details", 
body('studentId')
.trim()
.isNumeric()
.custom(value => { //Looking for "_id" field in Student table
    return Student.findOne({where: { id: value }}).then(student => {
        if (!student) return Promise.reject("Student do not exist.");
    });
}),
body('contactNo')
.trim()
.isNumeric()
.withMessage("Contact number can only contain numbers."),
body('dateOfBirth')
.isDate(),
body('bloodGroup')
.isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
studentController.createStudentDetails);

router.get('/profile',
body('id')
.isNumeric()
.withMessage("Student ID invalid.")
,studentController.getProfile);

router.get('/profile/details',
body('id')
.isNumeric()
.withMessage("Student ID invalid.")
,studentController.getProfileDetails);

module.exports = router;
