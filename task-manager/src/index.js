const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((error) => {
        res.status(500).send()
    })
})

app.get('/user/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((error) => {
        res.status(500).send()
    })
})

app.post('/users', (req, res) => {
    const newUser = new User(req.body)
    newUser.save().then(() => {
        res.status(201).send(newUser)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.patch('/user/:id', async (req, res) => {
    const _id = req.params.id
    const user = await User.findByIdAndUpdate(_id, req.body)
    const count = await User.countDocuments({ age: 1 })
    return count 
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/task/:id', (req, res) => {
    const _id = req.params.id
    Task.findById(_id).then((task) => {
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((error) => {
        res.status(500).send()
    })
})

app.post('/tasks', (req, res) => {
    const newTask = new Task(req.body)
    newTask.save().then(() => {
        res.status(201).send(newTask)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.delete('/task/:id', async (req, res) => {
    const _id = req.params.id
    const task = await Task.findByIdAndDelete(_id)
    const count = await Task.countDocuments({ completed: false })
    return count;
})

app.listen(port, () => {
    console.log('Server start on port ' + port)
})