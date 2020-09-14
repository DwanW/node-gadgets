const express = require('express')

const app = express()
const publicDirectory = path.join(__dirname, '../public')

const port = process.env.PORT || 3000

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dwan'
    })
})

app.listen(port, () => {
    console.log('Server start on port ' + port)
})