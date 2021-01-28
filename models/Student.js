const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Student = sequelize.define('student', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    studentName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    studentId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    session: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    hall: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bloodGroup: {
        type: Sequelize.STRING,
        allowNull: false
    },
    permanentAddress: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Student;