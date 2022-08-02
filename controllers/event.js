const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
    //Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            isError: true,
            errorMessage: errors.array(),
        });
    }
    try{
        const event = await Event.findOrCreate({
            where: {
                eventTitle: req.body.eventTitle,
                vanue: req.body.vanue,
                hostDepartment: req.body.hostDepartment,
                date: req.body.date,
                time: req.body.time
            }
        });
        if(event){
            res.status(201).json({
                message: "Event created successfully",
                event: event
            });
        }else{
            res.status(500).json({
                message: "Event creation failed"
            });
        }
    }catch (err) {
        console.log("/event/create" + err);
        return res.status(500).send({
            errorMessage: err,
        });
    }
}

exports.getEvents = async (req, res) => {
    //Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            isError: true,
            errorMessage: errors.array(),
        });
    }
    try{
        const events = await Event.findAll({
            where: {
                hostDepartment: "EEE",
                date: {
                    [Op.or]: {
                        [Op.eq]: new Date(),
                        [Op.gt]: new Date()
                    }
                }
            }
        });
        if(events){
            res.status(200).json({
                message: "Events fetched successfully",
                events: events
            });
        } else{
            res.status(500).json({
                message: "Events fetching failed"
            });
        }
    }catch(err){
        console.log("/event/get" + err);
        return res.status(500).send({
            errorMessage: err,
        });
    }
}

