const { validationResult } = require("express-validator");

const Routine = require("../models/Routine");
const CourseAssignedTo = require("../models/CourseAssignedTo");
const Faculty = require("../models/Faculty");
const Course = require("../models/Course");

/* 
    Controllers for admin
*/

exports.createRoutine = async (req, res) => {
    //Validation Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            errorMessage: errors.array(),
        });
    }

    try {
        const routine = await Routine.findOrCreate({
            where: {
                assignedCourseId: req.body.assignedCourseId,
                day: req.body.day,
                time: req.body.time,
                period: req.body.period,
                duration: req.body.duration,
            },
        });

        if (routine) {
            return res.status(200).send({
                successMessage: "Routine Created Successfully",
                routine: routine,
            });
        }
    } catch (err) {
        console.log("/routine/create" + err);
        res.status(500).send({
            errorMessage: "Server Error",
        });
    }
};

/* 
    Controllers for student
*/

//Get "today"s  routine for logged in users
exports.getRoutines = async (req, res) => {
    //Validation Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            errorMessage: errors.array(),
        });
    }

    try {
        const routines = await Routine.findAll({
            where: {
                // Getting todays day
                day: new Intl.DateTimeFormat("en-US", {
                    weekday: "long",
                }).format(new Date()),
            },
            attributes: ["day", "time", "period", "duration"],
            include: [
                {
                    model: CourseAssignedTo,
                    where: {
                        semester: req.body.semester,
                        year: req.body.year,
                    },
                    attributes: ["semester", "year"],
                    include: [
                        {
                            model: Course,
                            attributes: ["courseName", "courseCode"],
                        },
                        {
                            model: Faculty,
                            attributes: ["name", "department"],
                        }
                    ]
                }
            ]
        });

        console.log(routines);

        if (routines.length == 0) {
            return res.status(200).send({
                successMessage: "No routine for today",
            });
        } else if (routines) {
            return res.status(200).send({
                successMessage: "Routines Fetched Successfully",
                routines: routines,
            });
        }
    } catch (err) {
        console.log("/routine/get" + err);
        res.status(500).send({
            errorMessage: "Server Error",
        });
    }
};
