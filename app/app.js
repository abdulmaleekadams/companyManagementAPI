const bodyParser = require('body-parser')
const express = require('express')
const hrRouter = require('../routes/hrRoutes')
const customLogger = require('../middlewares/customLogger')

const app = express()

app.use(customLogger)
app.use(bodyParser.urlencoded({ extended: true }))


// Routes
const endpoint = 'api/v1/hr'
app.use('/api/v1/hr/', hrRouter);



module.exports = app