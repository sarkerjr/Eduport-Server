const { validationResult } = require("express-validator");

const Student = require("../models/Student");
const StudentDetail = require("../models/StudentDetail");
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

//Retrieve login student information
exports.getStudentDetails = (req, res, next) => {
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

exports.createStudentDetails = async (req, res, next) => {
    try {
        const studentDetail = await StudentDetail.findOrCreate({
            where: {
                studentId: req.body.studentId,
                contactNo: req.body.contactNo,
                dateOfBirth: req.body.dateOfBirth,
                bloodGroup: req.body.bloodGroup,
                localAddress: req.body.localAddress,
                permanentAddress: req.body.permanentAddress,
                academicBg: req.body.academicBg,
                medicalBg: req.body.medicalBg,
            },
        });

        if (studentDetail) {
            res.status(200);
            res.send({
                studentDetail: studentDetail,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(206);
    }
};
