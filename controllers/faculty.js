const Teacher = require("../models/Teacher");

const { validationResult } = require('express-validator');

exports.createTeacher = (req, res, next) => {
    //Check for validation error
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).send({
            isError: true,
            errorMessage: errors.array()
        });
    }
    
    Teacher.findOrCreate({
        where: {
            name: req.body.teacherName,
            position: req.body.position,
            department: req.body.teacherDepartment,
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
                isError: true,
            });
        });
};
