// CRUD
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id)

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    db.collection('tasks').deleteOne({
        description : "exercise"
    }).then((result) => {
        console.log(result)
    }).catch(error => console.log(error))
    
    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch(error =>
    //     console.log(error)
    // )

    // db.collection('tasks').findOne({
    //    _id: new ObjectID("5f56b8d3ba36026f9ceb615c")
    // }, (error, task) => {
    //     if (error) {
    //         return console.log('Unable to query task')
    //     }
    //     if (task) {
    //         console.log(task)
    //     } else {
    //         console.log('user not found')
    //     }
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     console.log(tasks)
    // })

    // db.collection('users').insertOne({
    //     name: 'Bob',
    //     age: 34
    // }, ( error, result ) => {
    //     if(error) {
    //         return console.log('Unable to insert User')
    //     }

    //     console.log(result.ops)
    // })
})