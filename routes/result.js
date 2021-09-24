const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const resultController = require("../controllers/result");

const Student = require("../models/Student");
const Course = require("../models/Course");
const Result = require("../models/Result");

const isAuthStudent = require("../middleware/is-auth-student");

router.post(
    "/create",
    body("studentId")
        .isInt({ gt: 0 })
        .withMessage("student id must be a positive integer")
        .custom((value) => {
            return Student.findByPk(value).then((student) => {
                if (!student) {
                    return Promise.reject("student not found");
                }
            });
        }),
    body("courseId")
        .isInt({ gt: 0 })
        .withMessage("course id must be a positive integer")
        .custom((value) => {
            return Course.findByPk(value).then((course) => {
                if (!course) {
                    return Promise.reject("course not found");
                }
            });
        }),
    body("score")
        .isFloat({ min: 1, max: 100 })
        .withMessage("score must be a float between 1 and 100"),
    body("type")
        .isIn(["Theory", "Practical"])
        .withMessage("type must be Theory or Practical"),
    body("status")
        .isIn(["Passed", "Due"])
        .withMessage("type must be Passed or Due"),
    resultController.createResult
);

router.post(
    "/create/details",
    body("resultId")
        .isInt({ gt: 0 })
        .withMessage("result id must be a positive integer")
        .custom((value) => {
            return Result.findByPk(value).then((result) => {
                if (!result) {
                    return Promise.reject("result not found");
                }
            });
        }),
    body("written")
        .isFloat({ min: 0, max: 60 })
        .withMessage("written must be a float between 0 and 60"),
    body("midterm")
        .isFloat({ min: 0, max: 20 })
        .withMessage("midterm must be a float between 0 and 20"),
    body("assignment")
        .isFloat({ min: 0, max: 10 })
        .withMessage("assignment must be a float between 0 and 10"),
    body("attendence")
        .isFloat({ min: 0, max: 10 })
        .withMessage("attendence must be a float between 0 and 10"),
    resultController.createResultDetails
);

/* 
        Routes for students
*/

router.get('/get', 
body('studentId')
.isInt({ gt: 0 })
.withMessage("student id must be a positive integer")
.custom((value) => {
    return Student.findByPk(value).then((student) => {
        if (!student) {
            return Promise.reject("student not found");
        }
    });
}),
body('semester')
.isInt({ min: 1, max: 2 })
.withMessage("semester must be an integer between 1 and 2"),
body('year')
.isInt({ min: 1, max: 4 })
.withMessage("year must be an integer between 1 and 4"),
isAuthStudent,
resultController.getResults);

router.get('/get/details', 
body('resultId')
.isInt({ gt: 0 })
.withMessage("result id must be a positive integer")
.custom((value) => {
    return Result.findByPk(value).then((result) => {
        if (!result) {
            return Promise.reject("result not found");
        }
    });
}),
isAuthStudent,
resultController.getResultDetails);

module.exports = router;
