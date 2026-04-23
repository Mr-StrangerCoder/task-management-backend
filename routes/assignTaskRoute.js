const express = require('express')
const assignTaskController = require("../controllers/assignTaskController")
const {auth, admin} = require('../middleware/auth')

const router = express.Router()


router.post('/assign', auth, admin, assignTaskController.assign)

router.get('/my_tasks',auth, assignTaskController.my_tasks)

// router.get('/allTasksWithUsers', auth,admin,assignTaskController.allTasksWithUsers)



module.exports = router