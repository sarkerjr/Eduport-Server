const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const eventController = require("../controllers/event");

router.post(
    "/create",
    body("eventTitle")
        .trim()
        .matches(/^[a-z. ]+$/i)
        .withMessage("Event title can only contain alphabets and numbers!"),
    body("vanue")
        .trim()
        .matches(/^[a-z. ]+$/i)
        .withMessage("Vanue title can only contain alphabets and numbers!"),
    body("hostDepartment")
        .trim()
        .isAlphanumeric()
        .withMessage(
            "Host Department Name can only contain alphabets and numbers!"
        ),
    body("date")
        .isDate()
        .withMessage("Date must be in the format of YYYY-MM-DD"),
    eventController.createEvent
);

router.get("/get", eventController.getEvents);

module.exports = router;