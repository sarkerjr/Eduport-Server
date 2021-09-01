const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/register',
body('email')
.isEmail()
.withMessage('Please enter a valid email address'),
body('password')
.isLength({ min: 8 })
.isAlphanumeric()
.withMessage('Password must be at least 8 characters long and contain alphanumeric characters')
.trim(),
body('accountType')
.isIn(['student', 'faculty', 'stuff']),
body('department')
.isAlpha(),
userController.createUser);

module.exports = router;