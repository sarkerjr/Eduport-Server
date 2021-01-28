const Sequelize = require("sequelize");

const sequelize = new Sequelize('dept-database', 'root', 'DB-PASSWORD', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
