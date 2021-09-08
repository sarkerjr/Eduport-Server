const { validationResult } = require("express-validator");

const Faculty = require("../models/Faculty");
const FacultyDetails = require("../models/FacultyDetail");

/* 
    Controllers for Admins
*/

exports.createFaculty = (req, res) => {
    //Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            isError: true,
            errorMessage: errors.array(),
        });
    }

    try {
        const faculty = Faculty.findOrCreate({
            where: {
                name: req.body.name,
                position: req.body.position,
                department: req.body.department,
                status: req.body.status,
            },
        });

        if (faculty) {
            res.status(201).json({
                message: "Faculty created successfully",
                faculty: faculty,
            });
        }
    } catch (err) {
        console.log("/faculty/create" + err);
        return res.status(500).send({
            errorMessage: err,
        });
    }
};

exports.createFacultyDetails = (req, res) => {
    //Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            isError: true,
            errorMessage: errors.array(),
        });
    }

    try {
        const facultyDetails = FacultyDetails.findOrCreate({
            where: {
                facultyId: req.body.facultyId,
                email: req.body.email,
                mobile: req.body.mobile,
                website: req.body.website,
                academic: req.body.academic,
                research: req.body.research,
                publications: req.body.publications,
            },
        });

        if (facultyDetails) {
            res.status(201).json({
                message: "Faculty details created successfully",
                facultyDetails: facultyDetails,
            });
        }
    } catch (err) {
        console.log("/faculty/create/details" + err);
        return res.status(500).send({
            errorMessage: err,
        });
    }
};

/* 
    Controllers for Students
*/

//Get faculty list according to logged in student
exports.getFaculty = async (req, res) => {
    //Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            isError: true,
            errorMessage: errors.array(),
        });
    }

    try {
        const faculties = await Faculty.findAll({
            where: {
                department: req.body.department,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            }
        });

        if (faculties) {
            res.status(200).json({
                faculties: faculties,
            });
        }
    } catch (err) {
        console.log("/faculty/get" + err);
        return res.status(500).send({
            errorMessage: err,
        });
    }
};

exports.getFacultyDetails = async (req, res) => {
    //Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            isError: true,
            errorMessage: errors.array(),
        });
    }

    try{
        const facultyDetails = await Faculty.findAll({
            where: {
                id: req.body.facultyId,
            },
            include: [{
                model: FacultyDetails,
                attributes: { exclude: ["facultyId", "createdAt", "updatedAt"] },
            }],
            attributes: ["name", "position"]
        });

        if (facultyDetails) {
            res.status(200).json({
                facultyDetails: facultyDetails,
            });
        }
    }catch(err){
        console.log("/faculty/get/details" + err);
        return res.status(500).send({
            errorMessage: err,
        });
    }
}