const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Student = sequelize.define('student', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    studentName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    studentId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    session: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    hall: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Student;