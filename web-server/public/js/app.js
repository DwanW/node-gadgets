console.log('Client side script loaded')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const forecastElement = document.querySelector('#forecast');
const locationElement = document.querySelector('#location');
const locateElement = document.querySelector('#locate')

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    const location = search.value
    const url = "/weather?address=" + location

    forecastElement.textContent = 'Loading...';
    locationElement.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                forecastElement.textContent = data.error;
                locationElement.textContent = '';
            } else {
                forecastElement.textContent = data.forecast;
                locationElement.textContent = data.location;
            }
        })
    })
})

locateElement.addEventListener('click', (e) => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        const url = "/weather?latitude=" + latitude + "&longitude=" + longitude

        forecastElement.textContent = 'Loading...';
        locationElement.textContent = ''
    
        fetch(url).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    forecastElement.textContent = data.error;
                    locationElement.textContent = '';
                } else {
                    forecastElement.textContent = data.forecast;
                    locationElement.textContent = data.address;
                }
            })
        })
    })
})
