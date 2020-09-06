console.log('Client side script loaded')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const forecastElement = document.querySelector('#forecast');
const locationElement = document.querySelector('#location');

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