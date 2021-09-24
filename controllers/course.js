const { validationResult } = require("express-validator");

const Course = require("../models/Course");
const CourseAssignedTo = require("../models/CourseAssignedTo");
const Faculty = require("../models/Faculty");

const info = require("../util/info");

/* 
    Controllers only for Admins
*/
exports.createCourse = async (req, res) => {
    //Validation Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            errorMessage: errors.array(),
        });
    }

    try {
        const course = await Course.findOrCreate({
            where: {
                courseName: req.body.courseName,
                courseCode: req.body.courseCode,
                courseCredit: req.body.courseCredit,
            },
        });

        if (course) {
            return res.status(201).send({
                message: "Course Created Successfully",
            });
        }
    } catch (err) {
        console.log("/course/create" + err);
        return res.status(500).send({
            errorMessage: err,
        });
    }
};

//Assigning course to a faculty member, semester and year
exports.assignCourse = async (req, res) => {
    //Validation Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            errorMessage: errors.array(),
        });
    }

    try {
        const assignCourse = await CourseAssignedTo.findOrCreate({
            where: {
                courseId: req.body.courseId,
                facultyId: req.body.facultyId,
                department: req.body.department,
                semester: req.body.semester,
                year: req.body.year,
            },
        });

        if (assignCourse) {
            return res.status(201).send({
                message: "Course Assigned Successfully",
            });
        }
    } catch (err) {
        console.log("/course/assign" + err);
        return res.status(500).send({
            errorMessage: err,
        });
    }
};

/* 
    Controllers only for Students
*/
//Get course list from a specific semester and year
exports.getCourseList = async (req, res) => {
    //Validation Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            errorMessage: errors.array(),
        });
    }

    
    try {
        const data = await info.getStudentInfo(req.body.id);
        
        const courses = await CourseAssignedTo.findAll({
            where: {
                semester: req.body.semester,
                year: req.body.year,
                department: data.department,
            },
            attributes: ["semester", "year"],
            include: [
                {
                    model: Course,
                    attributes: ["courseName", "courseCode", "courseCredit"],
                },
                {
                    model: Faculty,
                    attributes: ["name", "department"],
                },
            ],
        });

        if (courses) {
            return res.status(200).send({
                courses: courses,
            });
        }
    } catch (err) {
        console.log("/course/list/" + err);
        return res.status(500).send({
            errorMessage: err,
        });
    }
};
