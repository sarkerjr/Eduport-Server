const { validationResult } = require("express-validator");

const info = require("../util/info");

const Faculty = require("../models/Faculty");
const FacultyDetails = require("../models/FacultyDetail");

/* 
    Controllers for Admins
*/

exports.createFaculty = async (req, res) => {
    //Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            isError: true,
            errorMessage: errors.array(),
        });
    }

    try {
        const faculty = await Faculty.findOrCreate({
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
        }else{
            res.status(500).json({
                message: "Faculty creation failed"
            });
        }
    } catch (err) {
        console.log("/faculty/create" + err);
        return res.status(500).send({
            errorMessage: err,
        });
    }
};

exports.createFacultyDetails = async (req, res) => {
    //Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            isError: true,
            errorMessage: errors.array(),
        });
    }

    try {
        const facultyDetails = await FacultyDetails.findOrCreate({
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

    //Getting department from the logged in user
    const user = await info.getStudentInfo(req.body.id);

    try {
        const faculties = await Faculty.findAll({
            where: {
                department: user.department,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
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

    
    try {
        //Getting department from the logged in user
        const user = await info.getStudentInfo(req.body.id);
        
        const facultyDetails = await Faculty.findOne({
            where: {
                id: req.body.facultyId,
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: FacultyDetails,
                    attributes: {
                        exclude: ["facultyId", "createdAt", "updatedAt"],
                    },
                },
            ]
        });

        if (facultyDetails) {
            //Check if both student and faculty are in the same department
            if (facultyDetails.department !== user.department) {
                return res.status(403).send({
                    errorMessage: "You are not authorized to view this faculty",
                });
            }
            res.status(200).json({
                facultyDetails: facultyDetails,
            });
        } else {
            return res.status(404).send({
                errorMessage: "Faculty not found",
            });
        }
    } catch (err) {
        console.log("/faculty/get/details" + err);
        return res.status(500).send({
            errorMessage: err,
        });
    }
};
