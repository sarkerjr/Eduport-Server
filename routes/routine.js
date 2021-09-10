const express = require("express");
const { body } = require("express-validator");

const routineController = require("../controllers/routine");

const CourseAssignedTo = require("../models/CourseAssignedTo");

const router = express.Router();

/* 
    Routines for admin
*/

router.post(
    "/create",
    body("assignedCourseId")
        .isInt({ gt: 0 })
        .withMessage("Assigned course id must be a positive integer")
        .custom((value) => {
            return CourseAssignedTo.findByPk(value).then((assigned_course) => {
                if (!assigned_course) {
                    return Promise.reject("assigned course not found");
                }
            });
        }),
    body("day")
    .isIn(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"])
    .withMessage("Day must be a valid day of the week"),
    body("time")
    .isFloat({ gt: 0 })
    .withMessage("Time must be a positive number"),
    body("period")
    .isIn(["AM", "PM"])
    .withMessage("Period must be AM or PM"),
    body('duration')
    .isFloat({ gt: 0 })
    .withMessage("Duration must be a positive number"),
    routineController.createRoutine
);

/* 
    Routines for students
*/

router.get("/get", routineController.getRoutines);

module.exports = router;