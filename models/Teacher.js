const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Teacher = sequelize.define("teacher", {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    department: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Teacher;
