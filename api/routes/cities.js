const express = require('express')
const router = express.Router()
const db_con = require('../../db/db')
const ash = require('../utils')
const uuid = require('uuid/v4')

router.get('/', ash(async (req, res) => {
  const { name, population } = req.query
  const db = await db_con

  if(name && !population) {
    const formatName = `%${name}%`
    const query = 'SELECT * FROM cities WHERE name LIKE ?'
    const cities = await db.all(query, formatName)
    res.json(await cities)
    return
  } else if(!name && population) {
    const query = 'SELECT * FROM cities WHERE population >= ?'
    const cities = await db.all(query, population)
    res.json(await cities)
    return
  } else if(name && population) {
    const query = 'SELECT * FROM cities WHERE name LIKE ? AND population >= ?'
    const cities = await db.all(query, [name, population])
    res.json(await cities)
    return
  } else {
    const query = 'SELECT * FROM cities'
    const cities = await db.all(query)
    res.json(await cities)
  }
}))

router.post('/', ash(async (req, res) => {
  const { name, population } = req.body
  if(!name || !population) {
    throw Error('Please provide both name and population')
  }
  const db = await db_con
  const query = 'INSERT INTO cities VALUES (?, ?, ?)'
  await db.run(query, [name, population, uuid()]).then(() => res.send('Successfully created ' + name))
}))

router.put('/', ash(async (req, res) => {
  const id = req.query.id
  const { name: updateName, population: updatePop } = req.body
  if(!id && id.length < 1 ) {
    throw Error('Missing id')
  } else if(!updateName || !updatePop) {
    throw Error('Please provide both name and population')
  } else {
    const db = await db_con
    const query = 'UPDATE cities SET name=?, population=? WHERE id=?'
    const update = await db.run(query, [updateName, updatePop, id])
      .then(() => res.send('Successfully updated city'))
  }
}))

router.delete('/', ash(async (req, res) => {
  const id = req.query.id
  if(!id) {
    res.status(400)
    res.send()
  }
  const db = await db_con
  const query = 'DELETE FROM cities WHERE id=?'
  const deleted = await db.run(query, id)
    .then(() => {
      res.status(200)
      res.send()
    })
}))

module.exports = router