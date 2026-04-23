const User = require('./userModel')
const Task = require('./taskModel')
const AssignTask = require('./assignTaskModel')

// One User → Many Tasks
User.hasMany(Task, { foreignKey: 'createdBy',onDelete: 'CASCADE'})

// Each Task → One User
Task.belongsTo(User, { foreignKey: 'createdBy' })

// One User → Many Tasks
User.hasMany(Task, { foreignKey: 'updatedBy', onDelete: 'CASCADE'})

// Each Task → One User
Task.belongsTo(User, { foreignKey: 'updatedBy' })

User.hasMany(AssignTask, {foreignKey: 'user_id'})

AssignTask.belongsTo(User, {foreignKey:'user_id'})

Task.hasMany(AssignTask,{foreignKey:'task_id'})

AssignTask.belongsTo(Task,{foreignKey:'task_id'})