const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.get('/users/profile', auth, async (req, res) => {
    res.send(req.user)
})

router.post('/users/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users', async (req, res) => {
    const newUser = new User(req.body)
    try {
        await newUser.save()
        const token = await newUser.generateAuthToken()
        res.status(201).send({ newUser, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/user/profile', auth, async (req, res) => {
    const allowedUpdates = ['name', 'email', 'password']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Operation' })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(400).send({error})
    }
})

router.delete('/user/profile', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router