const Teacher = require("../models/Teacher");

exports.createTeacher = (req, res, next) => {
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
