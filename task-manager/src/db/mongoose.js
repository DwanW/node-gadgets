const mongoose = require('mongoose')

const connectionURL = process.env.DB_URL

mongoose.connect(connectionURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})