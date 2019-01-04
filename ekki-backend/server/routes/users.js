const express = require('express')

const User = require('../db/User')
const { unauthorized, wrap } = require('../middleware')

const router = express.Router()

const authenticate = wrap(async (req, res, next) => {
  const token = req.header('x-auth')
  const user = token && (await User.findByToken(token))
  if (!user) return unauthorized(req, res)

  res.locals.token = token
  res.locals.user = user
  next()
})

/**
 * Creates a new user.
 */
router.post('/', [
  wrap(async (req, res) => {
    const { username, password } = req.body.user
    const user = await new User({ username, password }).save()
    const token = await user.generateAuthToken()
    res.header('X-Auth', token).json({ user })
  }),
])

/**
 * Generates a new auth token for the user.
 */
router.post('/login', [
  wrap(async (req, res) => {
    const { username, password } = req.body.user
    const user = await User.findByCredentials(username, password)
    if (!user) return unauthorized(req, res)

    const token = await user.generateAuthToken()
    res.header('X-Auth', token).json({ user })
  }),
])

/**
 * Returns the authenticated user.
 */
router.get('/me', authenticate, [
  (req, res) => {
    const { user } = res.locals
    res.json({ user })
  },
])

/**
 * Removes the current auth token.
 */
router.delete('/me/token', authenticate, [
  async (req, res) => {
    const { user, token } = res.locals
    await user.removeToken(token)
    res.sendStatus(200)
  },
])

module.exports = { router }
