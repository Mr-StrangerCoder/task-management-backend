const {DataTypes} = require('sequelize')

const sequelize = require('../config/db')


const User = sequelize.define("User",{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contactNumber:{
        type:DataTypes.STRING
    },
    role:{
        type:DataTypes.ENUM("admin","user"),
        defaultValue:'user'
    },
    img_path:{
    type:DataTypes.STRING,
    allowNull:true   
}
},{timestamps:true,tableName:"users"})

module.exports = User


