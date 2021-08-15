const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const UserAccount = sequelize.define('user_account', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
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
    },
    accountType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
});

module.exports = UserAccount;