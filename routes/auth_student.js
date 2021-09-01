const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth_student');

const router = express.Router();

router.post('/login-student', 
body('email')
.isEmail()
.withMessage('Please enter a valid email address'),
authController.validateLogin);

module.exports = router;