const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const PORT = 5000
const routes = require('./api/routes')

app.use(cors())

app.use(express.json())

app.use(express.static(path.join(path.resolve(), '/public')))

app.use(routes)

app.listen(PORT, () => console.log('Server running on ' + PORT))