const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({owner: req.user._id})
        res.send(tasks)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/task/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/tasks', auth, async (req, res) => {
    const newTask = new Task({
        ...req.body,
        owner: req.user
    })
    try {
        await newTask.save()
        res.status(201).send(newTask)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/task/:id', auth, async (req, res) => {
    const _id = req.params.id
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation){
        return res.status(400).send({ error: 'Invalid Operation'})
    }
    try {
        const task = await Task.findOne({ _id, owner: req.user._id})
        console.log(task)
        if(!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/task/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router