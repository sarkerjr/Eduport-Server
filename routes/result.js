const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const resultController = require("../controllers/result");

router.post("/createResult", resultController.createResult);

module.exports = router;