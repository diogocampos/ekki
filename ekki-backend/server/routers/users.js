const express = require('express')

const User = require('../db/User')
const { wrap } = require('../middleware')

const router = express.Router()

router.post('/', [
  wrap(async (req, res) => {
    const { username, password } = req.body.user
    const user = await new User({ username, password }).save()
    const token = await user.generateAuthToken()
    res.header('X-Auth', token).json({ user })
  }),
])

module.exports = { router }
