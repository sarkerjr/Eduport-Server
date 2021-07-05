const { validationResult } = require("express-validator");

const Result = require("../models/Result");
const jwt = require('jsonwebtoken');

exports.createResult = (req, res, next) => {
    Result.findOrCreate({
        where: {
            studentId: req.body.studentId,
            courseId: req.body.courseId,
            score: req.body.score,
            cgpa: req.body.cgpa,
            type: req.body.type,
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
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getResults = async (req, res, next) => {
    try {
        const results = await Result.findAll({
            where: {
                studentId: req.body.userId,
            },
        });

        if (results)
            res.status(200).json(results);
        else
            res.status(404).send('NO RESULT FOUND!');
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
