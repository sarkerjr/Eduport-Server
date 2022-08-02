const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Event = sequelize.define("event", {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    eventTitle: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    vanue: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    hostDepartment: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
    },
    time: {
        type: Sequelize.DataTypes.TIME,
        allowNull: false
    }
});

module.exports = Event;