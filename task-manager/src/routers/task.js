const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()

// GET /task?completed=true
// GET /task?limit=10&&skip=10
// Get /task?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy){
        const parts = req.query.sortBy.split(":")
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const tasks = await Task.find({owner: req.user._id})
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
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

const upload = multer({
    // dest: 'avatar',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb(new Error('File must be a jpg,jpeg or png file'))
        }
        cb(undefined, true)
    }
})

router.post('/task/:id', auth, upload.single('image'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
    const _id = req.params.id
    const task = await Task.findOne({_id, owner: req.user._id})

    task.image = buffer
    await task.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/task/image/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findOne({_id, owner: req.user._id})

        task.image = undefined
        await task.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/tasks', auth, async (req, res) => {
    const newTask = new Task({
        ...req.body,
        owner: req.user._id
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