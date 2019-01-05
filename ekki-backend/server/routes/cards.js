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
      _user: res.locals.user._id,
      ...pick(req.body.card, 'number', 'expiry', 'holder'),
    }
    const card = await new CreditCard(data).save()
    res.json({ card })
  }),
])

/**
 * Returns the users's stored credit cards.
 */
router.get('/', authenticate, [
  wrap(async (req, res) => {
    const { user } = res.locals
    const cards = await CreditCard.find({ _user: user._id })
    res.json({ cards })
  }),
])

module.exports = { router }
