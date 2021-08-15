const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const FacultyDetail = sequelize.define("faculty_details", {
    facultyId: {
        type: Sequelize.INT,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    designation: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    website: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    academicBg: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    researchBg: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    publicationBg: {
        type: Sequelize.TEXT,
        allowNull: false,
    },

});

module.exports = FacultyDetail;