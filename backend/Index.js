const express = require("express")
const cors = require('cors')
const routes = require('./routes/Routes')
const port = 5000

const app = express()
app.use(express.json())
app.use(cors({credentials: true}))

app.use(routes)

app.use('/', (req, res) => {
    res.status(200).json({message: 'Sucesso - API em Node.js'})
})

const conn = require('./db/Connection')

//Conectando
conn.sync().then(app.listen(port)).catch((err) => console.log(err)) 