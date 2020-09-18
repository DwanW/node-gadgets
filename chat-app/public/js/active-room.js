const socket = io();

const dropdownTemplate = document.querySelector('#dropdown-template').innerHTML

const $dropdown = document.querySelector('#dropdown')
const $roomNameInput = document.querySelector('input[name="room"]')

socket.on('allRoomsData', ( rooms ) => {
    const html = Mustache.render(dropdownTemplate, {
        rooms
    })

    $dropdown.innerHTML = html
})

$dropdown.addEventListener('change', (e) => {
    $roomNameInput.value = e.target.value
})