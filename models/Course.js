const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Course = sequelize.define('course', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    courseName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    courseCode: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    courseCredit: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
    },
});

module.exports = Course;