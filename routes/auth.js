const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/login', 
body('email')
.isEmail()
.withMessage('Please enter a valid email address'),
authController.validateLogin);

module.exports = router;