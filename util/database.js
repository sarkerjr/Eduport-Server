const Sequelize = require("sequelize");

const sequelize = new Sequelize('dept-database', 'root', '123456789', {
    dialect: 'mysql',
    host: 'localhost'
});

//testing testing

module.exports = sequelize;
