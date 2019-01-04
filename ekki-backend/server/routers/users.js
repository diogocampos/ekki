const express = require('express')

const User = require('../db/User')
const { unauthorized, wrap } = require('../middleware')

const router = express.Router()

router.post('/', [
  wrap(async (req, res) => {
    const { username, password } = req.body.user
    const user = await new User({ username, password }).save()
    const token = await user.generateAuthToken()
    res.header('X-Auth', token).json({ user })
  }),
])

router.post('/login', [
  wrap(async (req, res) => {
    const { username, password } = req.body.user
    const user = await User.findByCredentials(username, password)
    if (!user) return unauthorized(req, res)

    const token = await user.generateAuthToken()
    res.header('X-Auth', token).json({ user })
  }),
])

module.exports = { router }
