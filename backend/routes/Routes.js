const express = require('express')
const app = express()

const ClientRoutes = require('./ClientRoutes')
const GameRoutes = require('./GameRoutes')
const SaleRoutes = require('./SaleRoutes')

app.use('/client',  ClientRoutes)
app.use('/game',    GameRoutes)
app.use('/sale',    SaleRoutes)

module.exports = app