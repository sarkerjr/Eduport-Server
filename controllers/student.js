const { validationResult } = require("express-validator");

const Student = require("../models/Student");
const StudentProfile = require("../models/StudentProfile");
const Result = require("../models/Result");

//create a new student profile
exports.createStudent = (req, res, next) => {
    //Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            isError: true,
            errorMessage: errors.array(),
        });
    }

    Student.findOrCreate({
        where: {
            studentName: req.body.studentName,
            studentId: req.body.studentId,
            session: req.body.session,
            dateOfBirth: req.body.dateOfBirth,
            hall: req.body.hall,
            bloodGroup: req.body.bloodGroup,
            permanentAddress: req.body.permanentAddress,
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

exports.getStudents = (req, res, next) => {
    Student.findAll()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));
};

exports.createStudentProfile = (req, res, next) => {
    //Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            isError: true,
            errorMessage: errors.array(),
        });
    }

    StudentProfile.findOrCreate({
        where: {
            studentNo: req.body.studentNo,
            email: req.body.studentEmail,
            password: req.body.studentPassword,
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

//Retrieve login student information
exports.getStudentProfile = (req, res, next) => {
    Student.findOne({
        where: {
            id: req.body.studentDBId,
        },
    })
        .then((result) => {
            if (result) {
                res.status(200);
                res.send({
                    studentDetails: result,
                });
            } else {
                res.status(404);
                res.send({
                    message: "Student Not Found",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(404);
            res.send({
                isError: true,
            });
        });
};

//Retrieving result for login user
exports.getResults = (req, res, next) => {
    Result.findAll({
        where: {
            studentId: req.body.studentDBId,
        },
    })
        .then((result) => {
            if (result) {
                res.status(200);
                res.send(result);
            } else {
                res.status(404);
                res.send({
                    message: "No result found!",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(404);
            res.send({
                isError: true,
            });
        });
};
