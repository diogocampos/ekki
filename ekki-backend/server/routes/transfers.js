const express = require('express')

const { authenticate } = require('./users')
const Transfer = require('../db/Transfer')
const { wrap } = require('../middleware')
const User = require('../db/User')

const router = express.Router()

/**
 * Makes a transfer to another user.
 */
router.post('/', authenticate, [
  wrap(async (req, res) => {
    const { to, amount } = req.body.transfer
    const sender = res.locals.user

    const receiver = await User.findOne({ username: to })
    if (!receiver) return

    const [senderBalance, receiverBalance] = await Promise.all([
      Transfer.getBalanceForUsername(sender.username),
      Transfer.getBalanceForUsername(receiver.username),
    ])

    const data = {
      sender: sender.username,
      receiver: receiver.username,
      amountFromBalance: amount,
      amountFromCard: 0,
      senderBalance: senderBalance - amount,
      receiverBalance: receiverBalance + amount,
    }

    const transfer = await new Transfer(data).save()
    res.json({ transfer })
  }),
])

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
