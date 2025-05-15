const { Sequelize } = require('sequelize');
const config = require('../config/mysql.json'); 

const sequelize = new Sequelize(config);
sequelize.sync();

module.exports = sequelize; 
