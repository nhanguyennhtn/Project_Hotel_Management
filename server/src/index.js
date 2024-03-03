const express = require('express')
const connectBD = require('./config')
const bodyParser = require('body-parser')
const route = require('./routes')
const cors = require('cors')

const app = express()
connectBD()

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

app.use(cors())
route(app)

const PORT = 3535
app.listen(PORT, () => console.log('App listening at http://localhost:' + PORT))