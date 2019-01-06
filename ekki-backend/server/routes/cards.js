const express = require('express')
const { pick } = require('lodash')

const { authenticate } = require('./users')
const CreditCard = require('../db/CreditCard')
const { notFound, validateId, wrap } = require('../middleware')

const router = express.Router()

router.param('_id', validateId)

/**
 * Stores a new credit card.
 */
router.post('/', authenticate, [
  wrap(async (req, res) => {
    const data = {
      _owner: res.locals.user._id,
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
    const cards = await CreditCard.find({ _owner: user._id })
    res.json({ cards })
  }),
])

/**
 * Removes a credit card.
 */
router.delete('/:_id', authenticate, [
  wrap(async (req, res) => {
    const { _id } = req.params
    const { user } = res.locals

    const card = await CreditCard.findOneAndDelete({ _id, _owner: user._id })
    card ? res.sendStatus(200) : notFound(req, res)
  }),
])

module.exports = { router }
