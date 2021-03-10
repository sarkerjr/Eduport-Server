const Student = require("../models/Student");
const StudentProfile = require("../models/StudentProfile");

const { validationResult } = require("express-validator");

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
