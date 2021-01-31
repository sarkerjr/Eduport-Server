const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const Course = require("../models/Course");
const courseController = require("../controllers/course");

router.post(
    "/createCourse",
    body("courseName")
        //Only letters, numbers and spaces allowd
        .custom((value, { req }) => {
            for (let s of req.body.courseName) {
                if (
                    !(
                        (48 <= s.charCodeAt() && s.charCodeAt() <= 57) ||
                        (65 <= s.charCodeAt() && s.charCodeAt() <= 90) ||
                        (97 <= s.charCodeAt() && s.charCodeAt() <= 122) ||
                        s.charCodeAt() == 32
                    )
                )
                    throw new Error("Name can only contain letters.");
            }
            return true;
        }),
    body("courseCode")
        .isAlphanumeric()
        .withMessage(
            "Course code can only contain letters and numbers with no spaces."
        )
        .custom((value, { req }) => {
            return Course.findOne({
                where: {
                    courseCode: req.body.courseCode,
                },
            }).then((result) => {
                console.log(result);
                if (result) {
                    return Promise.reject(
                        "Course code already assigned to another course!"
                    );
                }
            });
        }),
    body("courseCredit")
        .isNumeric()
        .withMessage("Course Credit can only contain numeric value"),
    body("assignedSemester")
        .isNumeric()
        .withMessage("Semester can only contain numeric value"),
    courseController.createCourse
);

module.exports = router;