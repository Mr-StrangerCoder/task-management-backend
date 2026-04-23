const express = require('express')
const taskController = require('../controllers/taskController')
const {auth,admin} = require('../middleware/auth')

const router = express.Router()

router.post('/create',auth, admin, taskController.createTask)
router.get('/getAllTasks', taskController.getAllTasks)


router.put("/updateTaskByAdmin/:task_ID", auth, admin, taskController.updateTaskByAdmin)

router.patch("/update_my_task/:task_ID", auth,taskController.update_my_task)

router.delete('/deleteTask/:task_ID', auth, admin, taskController.deleteTask)

router.get("/getTaskById/:task_ID", taskController.getTaskById)

module.exports = router