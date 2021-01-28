const Sequelize = require("sequelize");

const sequelize = new Sequelize('DB-NAME', 'DB_USERNAME', 'DB-PASSWORD', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
