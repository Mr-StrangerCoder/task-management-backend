const{Sequelize, DataTypes} = require('sequelize')

const sequelize = require('../config/db')
const Task = sequelize.define("Task",{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.ENUM('pending','inprogress','completed'),
        defaultValue:'pending'
    },
    priority:{
        type:DataTypes.ENUM('high','medium','low'),
        defaultValue:'low'
    },
    startDate:{
        type:DataTypes.DATE
    },
    endDate:{
        type:DataTypes.DATE
    }
},{
    timestamps:true,
    tableName:'tasks'
})

module.exports = Task