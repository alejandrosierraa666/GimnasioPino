// LA IDEA FINAL ES USAR SEQUELIZE PARA TRATAR CON LA BASE DE DATOS
const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_URL);

module.exports = sequelize;