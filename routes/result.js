const express = require("express");

const router = express.Router();

const resultController = require("../controllers/result");
const isAuth = require('../middleware/is-auth');

router.post("/createResult", isAuth, resultController.createResult);
router.get('/myResults', isAuth, resultController.getResults);

module.exports = router;