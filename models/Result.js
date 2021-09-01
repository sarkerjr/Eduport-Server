const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Result = sequelize.define('result', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    studentId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    courseId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    score: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false,
    },
    type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Result;