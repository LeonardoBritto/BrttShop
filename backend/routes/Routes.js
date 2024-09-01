const express = require('express')
const app = express()

const ClientRoutes = require('./ClientRoutes')
const GameRoutes = require('./GameRoutes')

app.use('/client',  ClientRoutes)
app.use('/game',    GameRoutes)

module.exports = app