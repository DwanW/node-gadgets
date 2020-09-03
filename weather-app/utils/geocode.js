const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3VudmFuZyIsImEiOiJja2VseHh6ajkwMTEwMnNvenN6NjRjamxoIn0.8NQTmIY-VJcDdNSw5D7HXg&limit=1';
    request({ url: url, json: true }, (error, response) => {
        const { features } = response.body;
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode;