const { validationResult } = require("express-validator");

const Result = require("../models/Result");
const ResultDetails = require("../models/ResultDetail");
const Course = require("../models/Course");

/* 
    Controllers for Admin
*/

exports.createResult = async (req, res) => {
    //Validation Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            errorMessage: errors.array(),
        });
    }

    try {
        const result = await Result.findOrCreate({
            where: {
                studentId: req.body.studentId,
                courseId: req.body.courseId,
                marks: req.body.marks,
                type: req.body.type,
                status: req.body.status,
            },
        });

        if (result) {
            return res.status(200).send({
                message: "Result Created Successfully",
                result: result,
            });
        }
    } catch (err) {
        console.log("/create" + err);
        res.status(500).send("Server Error");
    }
};

exports.createResultDetails = async (req, res) => {
    //Validation Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            errorMessage: errors.array(),
        });
    }

    try {
        const result_details = await ResultDetails.findOrCreate({
            where: {
                resultId: req.body.resultId,
                written: req.body.written,
                midterm: req.body.midterm,
                assignment: req.body.assignment,
                attendence: req.body.attendence,
            },
        });

        if (result_details) {
            return res.status(200).send({
                message: "Result Details Created Successfully",
                result_details: result_details,
            });
        }
    } catch (err) {
        console.log("/create/details" + err);
        res.status(500).send("Server Error");
    }
};

/* 
    Controllers for Student
*/

exports.getResults = async (req, res) => {
    //Validation Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            errorMessage: errors.array(),
        });
    }

    try {
        const results = await Result.findAll({
            where: {
                studentId: req.body.studentId,
                semester: req.body.semester,
                year: req.body.year,
            },
            attributes: {
                exclude: ["studentId", "courseId", "createdAt", "updatedAt"],
            },
            include: [
                {
                    model: Course,
                    attributes: ["courseName", "courseCode"],
                },
            ],
        });

        if (results) {
            return res.status(200).send({
                message: "Results Fetched Successfully",
                results: results,
            });
        }
    } catch (err) {
        console.log('/result/get' + err);
        res.status(500).send("Server Error");
    }
};

exports.getResultDetails = async ( req, res ) => {
    //Validation Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            errorMessage: errors.array(),
        });
    }

    try {
        const details = await ResultDetails.findAll({
            where: {
                resultId: req.body.resultId
            },
            attributes: { exclude: ["resultId", "createdAt", "updatedAt"] }
        });

        if (details) {
            return res.status(200).send({
                message: "Course Details Fetched Successfully",
                details: details,
            });
        }
    } catch (err) {
        console.log('/result/get/details' + err);
        res.status(500).send("Server Error");
    }
}