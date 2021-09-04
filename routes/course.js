const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const Course = require("../models/Course");
const courseController = require("../controllers/course");
const isAuth = require("../middleware/is-auth");

/* 
    Routes for Admin
*/
// .matches(/^[a-z ]+$/i)
router.post(
    "/create",
    body("courseName")
        .trim()
        .matches(/^[0-9a-z ]+$/i)
        .withMessage("Course title can only contain letters and numbers."),
    body("courseCode")
        .trim()
        .isAlphanumeric('en-US', {ignore: ' '})
        .withMessage(
            "Course code can only contain letters and numbers with no spaces."
        )
        .custom((value) => {
            return Course.findOne({where: { courseCode: value }}).then((course) => {
                if (course) {
                    return Promise.reject("Course code already exists!");
                }
            });
        }),
    body("courseCredit")
        .isDecimal()
        .withMessage("Course Credit can only contain numeric value"),
    courseController.createCourse
);

router.post('/assign', 
body('courseId')
.isNumeric()
.isInt({min: 1})
.withMessage('Course ID must be a number greater than 0'),
body('facultyId')
.isNumeric()
.isInt({min: 1})
.withMessage('Faculty ID must be a number greater than 0'),
body('semester')
.isNumeric()
.isInt({min: 1, max: 2})
.withMessage('Semester must be a number between 1 and 4'),
body('year')
.isNumeric()
.isInt({min: 1, max: 4})
.withMessage('Year must be a number between 1 and 4'),
courseController.assignCourse);

/* 
        Routes for Students
*/
router.get('/list', 
body('semester')
.isNumeric()
.isInt({min: 1, max: 2})
.withMessage('Semester value can be between 1-2'),
body('year')
.isNumeric()
.isInt({min: 1, max: 4})
.withMessage('Year value can be between 1-4'),
courseController.getCourseList);

module.exports = router;
