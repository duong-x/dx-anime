const express = require('express')
const cors = require('cors')
const path = require('path')

const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")));

routes(app)

app.listen(5000, () => console.log('Server runing ...'))