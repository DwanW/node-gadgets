const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(path.join(__dirname, '../public'))
// console.log(__filename)

const app = express()

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

/// Setup handlebars engine and views folder location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Serve static files
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dwan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dwan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address && (!req.query.latitude && !req.query.longitude)) {
        return res.send({
            error: 'You must provide a location'
        })
    }
    // use location query ?address=example
    if (req.query.address) {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: error,
                })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error,
                    })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    } else {
        // use coordinate query ?latitude=example&longitude=example 
        forecast(req.query.latitude, req.query.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error,
                })
            }
            res.send({
                forecast: forecastData,
                address: `Latitude: ${parseInt(req.query.latitude).toFixed(2)}, Longitude : ${parseInt(req.query.longitude).toFixed(2)}`
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dwan',
        message: 'The Help you are looking for cannot be found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dwan',
        message: 'The Page does not exist'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000')
})