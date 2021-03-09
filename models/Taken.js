const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Taken = sequelize.define("taken", {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    studentId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    teacherId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    courseId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Taken;
