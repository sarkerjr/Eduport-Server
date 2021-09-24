const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const isAuthStudent = require("../middleware/is-auth-student");

const facultyControllelr = require("../controllers/faculty");
const Faculty = require("../models/Faculty");

/* 
    Routes for Admins
*/

// matches(/^[a-z ]+$/i)
router.post(
    "/create",
    body("name")
        .trim()
        .matches(/^[a-z. ]+$/i)
        .withMessage("Field can only contain alphabets!"),
    body("position")
        .trim()
        .matches(/^[a-z ]+$/i)
        .withMessage("Field can only contain alphabets!"),
    body("department")
        .trim()
        .matches(/^[a-z ]+$/i)
        .withMessage("Field can only contain alphabets!"),
    body("status")
        .trim()
        .matches(/^[a-z ]+$/i)
        .withMessage("Field can only contain alphabets!")
        .isIn(["Active", "On Leave"])
        .withMessage("Status can only be active or on leave!"),
    facultyControllelr.createFaculty
);

router.post(
    "/create/details",
    body("facultyId")
        .isInt()
        .withMessage("Faculty ID must be an integer")
        .custom((value) => {
            //Looking for "_id" field in Faculty table
            return Faculty.findOne({ where: { id: value } }).then((faculty) => {
                if (!faculty) return Promise.reject("Faculty do not exist.");
            });
        }),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email address"),
    body("mobile")
        .trim()
        .isMobilePhone()
        .withMessage("Please enter a valid mobile number"),
    body("website").trim().isURL().withMessage("Please enter a valid website"),
    facultyControllelr.createFacultyDetails
);

/* 
    Routes for Students
*/

router.get("/get", isAuthStudent, facultyControllelr.getFaculty);

router.get(
    "/get/details",
    body("facultyId").isInt().withMessage("Faculty ID must be an integer"),
    isAuthStudent,
    facultyControllelr.getFacultyDetails
);

module.exports = router;
