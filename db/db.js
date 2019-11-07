const sqlite = require('sqlite')
const path = require('path')
const db = path.resolve(__dirname, 'db.sqlite')

const connect = () => sqlite.open(db)

module.exports = connect()