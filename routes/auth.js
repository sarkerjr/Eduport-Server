const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.validateLogin);

module.exports = router;
