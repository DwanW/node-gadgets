const socket = io();

socket.on('message', (message) => {
    console.log(message)
})

socket.on('receiveChat', (msg) => {
    console.log(msg)
})

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.chat.value
    socket.emit('updateChat', message)
})
