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
    'https://task-management-frontend-one-nu.vercel.app',  // your frontend URL
    'http://localhost:5173'  // local dev
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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

app.listen(process.env.PORT || 5010, () => {
  console.log(`Server running on port ${process.env.PORT || 5010}`)
})

