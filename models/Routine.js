const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Routine = sequelize.define('routine', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    assignedCourseId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    day: {
        type: Sequelize.STRING,
        allowNull: false
    },
    time: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    period: {
        type: Sequelize.STRING,
        allowNull: false
    },
    duration: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
});

module.exports = Routine;