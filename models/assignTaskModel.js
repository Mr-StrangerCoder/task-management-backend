const{Sequelize, DataTypes} = require('sequelize')

const sequelize = require('../config/db')
const assignTask = sequelize.define("AssignTask",{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    task_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:true,
    tableName:'assign_task'
})





module.exports = assignTask