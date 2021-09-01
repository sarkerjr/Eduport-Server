const { validationResult } = require('express-validator');

const Course = require("../models/Course");

//Course craeted by admin
exports.createCourse = (req, res, next) => {
    //Check for validation error
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).send({
            errorMessage: errors.array()
        });
    }

    Course.findOrCreate({
        where: {
            courseName: req.body.courseName,
            courseCode: req.body.courseCode,
            courseCredit: req.body.courseCredit,
            assignedSemester: req.body.assignedSemester
        },
    })
        .then(([result, created]) => {
            res.status(201);
            res.send({
                isError: false,
                isCreated: created,
                result: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(206);
            res.send({
                isError: true
            });
        });
};
