const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host:"localhost",
//     user:"root",
//     database:"node-complete",
//     password:"alok"
// })

// module.exports = pool.promise();




const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "alok", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;