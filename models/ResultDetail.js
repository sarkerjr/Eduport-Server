const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ResultDetails = sequelize.define('result_details', {
    resultId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    written: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    midterm: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    classTest: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    viva: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    attendence: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
});

module.exports = ResultDetails;