const AssignTask = require('../models/assignTaskModel')
const Task = require('../models/taskModel')


const assign = async (req,res)=>{
    try{
        const {user_id, task_id}=req.body 
        const newAssign = await AssignTask.create({user_id:user_id, task_id:task_id})
        if(!newAssign){
            res.status(400).send({msg:"Something wrong",success:false})
        }else{
        res.status(200).send({msg:"Task Assign Successfully", success:true})
        }

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
    }

}

const my_tasks = async (req,res) =>{
    try{
        const user_id = req.user.id
        const tasks = await AssignTask.findAll({
            where:{user_id:user_id},
            
            include:[{
                model:Task,
                attributes:[
                    'title',
                    'description',
                    'status',
                    'priority',
                    'startDate',
                    'endDate'
                ]
            }]
            })


        res.status(200).send({success:true, tasks:tasks})
} catch (error) {
    console.log(error)
        res.status(500).send({ success: false, msg: "Server Error" })
    }

}


module.exports = {
    assign,
    my_tasks
}