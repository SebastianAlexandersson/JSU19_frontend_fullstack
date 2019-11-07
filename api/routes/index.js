const express = require('express')
const router = express.Router()
const cities = require('./cities')

router.use('/api/cities', cities)

module.exports = router