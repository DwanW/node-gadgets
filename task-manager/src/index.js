const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if(req.method === 'GET'){

//     }else {

//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently under maintance. Check back soon')
// })

app.use(express.json())
app.use(userRouter, taskRouter)

app.listen(port, () => {
    console.log('Server start on port ' + port)
})