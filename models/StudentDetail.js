const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const StudentDetails = sequelize.define('student_details', {
    studentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        unique: true
    },
    contactNo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    bloodGroup: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    localAddress: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    permanentAddress: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    academicBg: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    medicalBg: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = StudentDetails;