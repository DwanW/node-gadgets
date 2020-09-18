const rooms = []

const updateRoom = ( roomName, changeInUserNumber ) => {
    roomName = roomName.trim().toLowerCase()

    const roomIdx = rooms.findIndex((room) => room.roomName === roomName )

    if(roomIdx !== -1){
        rooms[roomIdx].activeUserNumber += changeInUserNumber

        if(rooms[roomIdx].activeUserNumber === 0) {
            return rooms.splice(roomIdx, 1)[0]
        }
    } else {
        rooms.push({
            roomName,
            activeUserNumber: 1
        })
    }
}

module.exports = {
    rooms,
    updateRoom
}