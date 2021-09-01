const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const FacultyDetail = sequelize.define("faculty_details", {
    facultyId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    website: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    academic: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    research: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    publications: {
        type: Sequelize.TEXT,
        allowNull: false,
    },

});

module.exports = FacultyDetail;