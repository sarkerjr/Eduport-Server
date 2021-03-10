const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const StudentProfile = sequelize.define('studentProfile', {
    studentNo: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
});

module.exports = StudentProfile;