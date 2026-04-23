const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/userModel')  

const BASE_URL = 'http://localhost:5010/upload/'

async function register(req, res) {
    const { name, email, password, contactNumber } = req.body
     const imgPATH =req.file ?  req.file.filename : null
    try {

       const regUser = await User.findOne({ where: { email: email } })
        if (regUser) 
        {
           return res.status(400).send({ success:false, msg: "email already registered" })
        } 
        else
        {
            const salt = await bcryptjs.genSalt(8)
            const hashPassword = await bcryptjs.hash(password, salt)

          const  newUser = await User.create({
                name: name,
                email: email,
                password: hashPassword,
                contactNumber: contactNumber,
                img_path: imgPATH
            })
            res.status(200).send({ success: true, msg: "registered successfully" })
        }
    } catch (error) {
        console.log("real error", error)
        res.status(500).send({ success: false, msg: "Server Error" })

    }
}

async function login(req, res) {
    const { email, password } = req.body
    try {
        const alreadyUser = await User.findOne({ where: { email: email } })
        console.log(alreadyUser)
        if (!alreadyUser) {
          return  res.status(400).send({ msg: "User not found" })
        } else {
          const checkPassword = await bcryptjs.compare(password, alreadyUser.password)
            console.log(checkPassword)
            if (!checkPassword) {
              return  res.status(400).send({ msg: "Invalid Password" })
            } else {
                const ID = alreadyUser.id
                const role = alreadyUser.role
                // console.log(ID,"******ID")
                const genToken = jwt.sign({ id: ID, role: role }, process.env.SECRET_KEY, { expiresIn: "7d" })
                res.status(200).send({ success: true, msg: "Login successful", token: genToken })
            }
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })

    }
}

async function getUserInfo(req, res) {
    try {
        const ID = req.user.id
        // console.log(ID, "********************************8")
        const loggedUserInfo = await User.findByPk(ID, {
            attributes: {
                exclude: ["password"]
            }
        })
         const loggedUserInfoSTR=loggedUserInfo.toJSON()
        loggedUserInfoSTR.img_path =loggedUserInfo.img_path ? BASE_URL+loggedUserInfo.img_path : null
        // console.log(loggedUserInfo, "**********************************")
        res.status(200).send({ user: loggedUserInfoSTR, success: true })
    } catch (error) {
        //    console.log("ERROR IN REGISTER:", error) 
        res.status(500).send({ success: false, msg: "Server Error" })

    }
}

async function updateUser(req,res){
    try{

        const ID = req.user.id
        console.log(ID, "333333333333333333333333333333333")
        const user = await User.findByPk(ID)
        console.log(user, "111111111111111111111111111111111")
        if(!user){
             return res.status(400).send({ msg: "task not found" })
        } else{
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.password = req.body.password || user.password
            user.contactNumber = req.body.contactNumber || user.contactNumber
            await user.save()
        res.status(200).send({success:true , msg:"User update successfully"})

        }
    }catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })

    }
}

async function getAllUsers(req, res){
    try {
            const allUser = await User.findAll({
                attributes:['id','name' ]
            })
            res.status(200).send({success:true, allUser:allUser})
        
    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
        
    }
}

module.exports = {
    register,
    login,
    getUserInfo,
    getAllUsers,
    updateUser
}


// {
//     "name":"John",
//     "email":"john@gmail.com",
//     "password":"john123",
//     "contactNumber":"1234567890"
// }