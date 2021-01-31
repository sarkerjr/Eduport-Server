const { validationResult } = require("express-validator");

const Result = require("../models/Result");

exports.createResult = (req, res, next) => {
    Result.findOrCreate({
        where: {
            studentId: req.body.studentId,
            courseId: req.body.courseId,
            score: req.body.score,
            cgpa: req.body.cgpa,
            type: req.body.type
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
