const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const testUserId = new mongoose.Types.ObjectId()

const testUser = {
    _id: testUserId,
    name: 'Villain',
    email: 'villainy@yahoo.com',
    password: 'asdklqwe',
    tokens: [{
        token: jwt.sign({ _id: testUserId }, process.env.JWT_KEY)
    }]
}

const testUserTwoId = new mongoose.Types.ObjectId()

const testUserTwo = {
    _id: testUserTwoId,
    name: 'Toval',
    email: 'toval@example.com',
    password: 'asdaweqaqwec',
    tokens: [{
        token: jwt.sign({ _id: testUserTwoId }, process.env.JWT_KEY)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'first task',
    completed: false,
    owner: testUser._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'second task',
    completed: true,
    owner: testUser._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'third task',
    completed: false,
    owner: testUserTwo._id
}


const resetDataBase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(testUser).save()
    await new User(testUserTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    testUserId,
    testUser,
    resetDataBase,
    taskThree
}