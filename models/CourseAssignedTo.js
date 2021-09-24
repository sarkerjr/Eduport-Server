const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const CourseAssignedTo = sequelize.define(
    "course_assigned_to",
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        courseId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        facultyId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        department: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        semester: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        year: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = CourseAssignedTo;
