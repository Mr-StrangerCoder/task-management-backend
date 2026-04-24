const Task = require('../models/taskModel')


async function createTask(req, res) {
    try {
        const { title, description, startDate, endDate, status, priority } = req.body
        const Id = req.user.id
        const newTask = await Task.create({
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            status: status || 'pending',
            priority: priority || 'low',
            createdBy: Id,
            updatedBy: Id
        })
        console.log(newTask)
        res.status(200).send({ success: true, msg: "Task created successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, msg: "Server Error" })
    }
}

async function getAllTasks(req, res) {
    try {
        const allTasks = await Task.findAll()
        res.status(200).send({ success: true, allTasks: allTasks })

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })

    }
}

async function updateTaskByAdmin(req, res) {
    console.log(req.body)
    const task_id = req.params.task_ID

    const task = await Task.findByPk(task_id)
    if (!task) {
        return res.status(400).send({ msg: "task not found" })
    } else {
        task.title = req.body.title || task.title
        task.description = req.body.description || task.description
        task.startDate = req.body.startDate || task.startDate
        task.endDate = req.body.endDate || task.endDate
        task.priority = req.body.priority || task.priority
        task.status = req.body.status || task.status
        task.updatedBy = req.user.ID

        await task.save()
        res.status(200).send({ msg: "Task updated successfully", success: true })
    }
}
async function update_my_task(req, res) {
    try {
        // console.log(req.user.ID)
        // console.log(req.params.taskID)

        const task_id = req.params.task_ID
        console.log(task_id)
        const task = await Task.findByPk(task_id)
        console.log(task, "7777777777777777")
        if (!task) {
            return res.status(400).send({ msg: "task not found" })
        } else {
            task.status = req.body.status || task.status
            await task.save()
            res.status(200).send({ msg: "Task updated successfully", success: true })
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })

    }
}

async function deleteTask(req, res) {
    try {

        const task = await Task.findByPk(req.params.task_ID)
        if (!task) {
            return res.status(400).send({ msg: "Task not found" })
        } else {
            await task.destroy()
            return res.status(200).send({ success: true })
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })

    }
}

async function getTaskById(req, res) {
    try {
        const task = await Task.findByPk(req.params.task_ID)
        if (task) {
            return res.status(200).send({ success: true, task: task })

        } else {
            res.status(400).send({ msg: "Task not found" })
        }

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })

    }
}


module.exports = {
    createTask,
    getAllTasks,
    updateTaskByAdmin,
    update_my_task,
    deleteTask,
    getTaskById
}

// {
//     "title":"Task 1",
//     "description":"rty rtyui ",
//     "priority":"high",
//     "status":"pending",
//     "startDate":"2026-10-29",
//     "endDate":"202-11-20",
// }