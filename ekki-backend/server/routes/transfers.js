const express = require('express')

const { authenticate } = require('./users')
const Transfer = require('../db/Transfer')
const { wrap } = require('../middleware')

const router = express.Router()

/**
 * Returns the user's history of sent and received transfers.
 */
router.get('/', authenticate, [
  wrap(async (req, res) => {
    const { user } = res.locals
    const transfers = await Transfer.findByUsername(user.username)
    res.json({ transfers })
  }),
])

module.exports = { router }
