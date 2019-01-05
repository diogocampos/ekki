const express = require('express')
const { pick } = require('lodash')

const { authenticate } = require('./users')
const CreditCard = require('../db/CreditCard')
const { wrap } = require('../middleware')

const router = express.Router()

/**
 * Stores a new credit card.
 */
router.post('/', authenticate, [
  wrap(async (req, res) => {
    const data = {
      ...pick(req.body.card, 'number', 'expiry', 'holder'),
      _owner: res.locals.user._id,
    }
    const card = await new CreditCard(data).save()
    res.json({ card })
  }),
])

module.exports = { router }
