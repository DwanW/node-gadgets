const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=16681982323b0b360a9c6410ff8082a5&query=" + lat + ',' + long;
    
    request({ url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather services', undefined)
        } else if (response.body.features.length === 0){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${response.body.current.weather_descriptions[0]}.it is currently ${response.body.current.temperature} degrees, it feels like ${response.body.current.feelslike}.`)
        }
    })
} 

module.exports = forecast;