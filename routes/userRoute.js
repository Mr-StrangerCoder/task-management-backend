const express = require('express')
const userController = require('../controllers/userController')
const {auth} = require('../middleware/auth')
const upload = require('../middleware/multer')
const router = express.Router()

router.post('/register',upload.single('myFile'),userController.register)
router.post('/login',userController.login) 

router.get('/getUserInfo',auth, userController.getUserInfo)

router.patch('/updateUser', auth, userController.updateUser)

router.get('/getAllUsers', userController.getAllUsers)




module.exports =router