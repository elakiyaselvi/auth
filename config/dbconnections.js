const Sequelize = require("sequelize");
const sequelize = new Sequelize("lmsapi", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: 1,
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.User = require("../app/models/user")(sequelize, Sequelize);
module.exports = db;
