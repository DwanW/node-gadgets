const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')
const { rooms, updateRoom} = require('./utils/rooms')


const app = express()
const server = http.createServer(app)

const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname, '../public')

app.use(express.static(publicDirectory))

io.emit("allRoomsData", rooms)

io.on('connection', (socket) => {
    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room })

        if(error){
            return callback(error)
        }

        socket.join(user.room)

        updateRoom(room, 1)

        socket.emit("message", generateMessage('Chat Bot', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Chat Bot', `${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
        io.emit("allRoomsData", rooms)
        callback()
    })

    socket.on('updateChat', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('profanity is not allowed')
        }

        const {room, username} = getUser(socket.id)
        io.to(room).emit("message", generateMessage(username, message))
        callback()
    })

    socket.on('shareLocation', ({ latitude, longitude }, callback) => {
        const {room, username} = getUser(socket.id)
        io.to(room).emit("locationMessage", generateLocationMessage(username, `https://google.com/maps?q=${latitude},${longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user){
            updateRoom(user.room, -1)
            io.to(user.room).emit("message", generateMessage('Chat Bot',`${user.username} has left`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
            io.emit("allRoomsData", rooms)
        }

    })
})

server.listen(port, () => {
    console.log('Server start on port ' + port)
})