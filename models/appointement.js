const Sequelize = require('sequelize');

const sequelize = require('../database/database');

const Product = sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement :true,
        allowNull:false,
        primaryKey:true,
    },
    name:
    {
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    phone:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})
module.exports = Product;