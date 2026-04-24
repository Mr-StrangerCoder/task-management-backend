const express = require('express')
require('dotenv').config()
const cors = require('cors')

const path =require('path')

const dbConn = require('./config/db')
const association = require('./models/associations')

const taskRouter = require('./routes/taskRoute')

const userRouter = require('./routes/userRoute')
const assignTaskRouter = require('./routes/assignTaskRoute')


const port = process.env.PORT 
const app = express()

app.use(cors({
  origin: [
    "https://task-management-frontend-jn0zwuet9-aadesh-sonawane-s-projects.vercel.app"
    
  ],
  credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.send("I am Server ")
})

app.use('/task', taskRouter)
app.use('/user', userRouter)
app.use('/assignTask', assignTaskRouter)

app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})

