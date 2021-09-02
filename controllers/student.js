const { validationResult } = require("express-validator");

const Student = require("../models/Student");
const StudentDetail = require("../models/StudentDetail");

//create a new student profile
exports.createStudent = async (req, res) => {
    //Validation Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            errorMessage: errors.array(),
        });
    }

    try {
        const student = await Student.findOrCreate({
            where: {
                userId: req.body.userId,
                studentName: req.body.studentName,
                studentId: req.body.studentId,
                gender: req.body.gender,
                department: req.body.department,
                session: req.body.session,
                hall: req.body.hall,
            },
        });

        if (student) {
            res.status(201).json({
                message: "Student created successfully",
                student: student,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Creating student failed",
            error: err,
        });
    }
};

exports.createStudentDetails = async (req, res) => {
    //Validation Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            errorMessage: errors.array(),
        });
    }

    try {
        const details = await StudentDetail.findOrCreate({
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

        if (details) {
            res.status(201).json({
                message: "Student details created successfully",
                details: details,
            });
        }
    } catch (err) {
        console.log("student/create/details" + err);
        res.status(500).json({
            message: "Creating student details failed",
            error: err,
        });
    }
};

exports.getProfile = async (req, res) => {
    //Validation Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            errorMessage: errors.array(),
        });
    }

    try {
        const student = await Student.findOne({
            where: {
                id: req.body.id,
            },
        });

        if (student) {
            res.status(200).json({
                student: student,
            });
        } else {
            res.status(404).json({
                message: "Student not found",
            });
        }
    } catch (err) {
        console.log("/sutdent/profile - " + err);
        res.status(500).json({
            message: "Getting profile failed",
            error: err,
        });
    }
};

exports.getProfileDetails = async (req, res) => {
    //Validation Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            errorMessage: errors.array(),
        });
    }

    try{
        const student = await Student.findOne({
            where: {
                id: req.body.id,
            },
            include: [StudentDetail],
        });

        if(student && student.student_detail){
            res.status(200).json({
                profileDetails: profileDetails,
            });
        } else {
            res.status(404).json({
                message: "Student details not found",
            });
        }
    }catch(err){
        console.log("/sutdent/profile/details - " + err);
        res.status(500).json({
            message: "Getting profile failed",
            error: err,
        });
    }
};
