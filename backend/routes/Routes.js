const express = require('express')
const app = express()

const ClientRoutes = require('./ClientRoutes')

app.use('/client', ClientRoutes)

module.exports = app