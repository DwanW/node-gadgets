const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String 
    },
    age: {
        type: Number
    }
})

// const newUser = new User({
//     name: 'Rean',
//     age: 22
// })

// newUser.save().then(data => console.log(data)).catch(
//     error => console.log(error)
// )

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const newTask = new Task({
    description: "read a new book",
    completed: false
})

newTask.save().then(data => console.log(data)).catch(
        error => console.log(error)
    )