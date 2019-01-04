const express = require('express')

const User = require('../db/User')
const { wrap } = require('../middleware')

const router = express.Router()

router.post('/', [
  wrap(async (req, res) => {
    const { username } = req.body.user
    const user = await new User({ username }).save()
    res.json({ user })
  }),
])

module.exports = { router }
