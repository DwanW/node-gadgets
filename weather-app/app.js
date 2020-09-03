const geocode = require('./utils/geocode');

const forecast = require('./utils/forecast');

geocode('Calgary', (error, data) => {
    console.log('Error',error)
    console.log('Data', data)
})

forecast("51.083", "-114.083", (error, data) => {
    console.log('Error',error)
    console.log('Data', data)
})