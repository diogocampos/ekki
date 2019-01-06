const express = require('express')

const { authenticate } = require('./users')
const Transfer = require('../db/Transfer')
const { wrap } = require('../middleware')

const router = express.Router()

/**
 * Returns the user's current balance.
 */
router.get('/', authenticate, [
  wrap(async (req, res) => {
    const { user } = res.locals
    const balance = await Transfer.getBalanceForUsername(user.username)
    res.json({ balance })
  }),
])

module.exports = { router }
