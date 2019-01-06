const express = require('express')

const { authenticate } = require('./users')
const CreditCard = require('../db/CreditCard')
const Transfer = require('../db/Transfer')
const User = require('../db/User')
const { wrap } = require('../middleware')

const router = express.Router()

/**
 * Makes a transfer to another user.
 */
router.post('/', authenticate, [
  wrap(async (req, res) => {
    const { to, amount: totalAmount, cardId } = req.body.transfer
    const sender = res.locals.user

    const receiver = await User.findOne({ username: to })
    if (!receiver) return

    const [senderBalance, receiverBalance] = await Promise.all([
      Transfer.getBalanceForUsername(sender.username),
      Transfer.getBalanceForUsername(receiver.username),
    ])

    let amountFromBalance = totalAmount
    let amountFromCard = 0

    if (totalAmount > senderBalance) {
      // insufficient balance: require credit card id
      if (!cardId) return

      const card = await CreditCard.findOne({ _id: cardId, _owner: sender._id })
      if (!card) return

      amountFromBalance = senderBalance
      amountFromCard = totalAmount - amountFromBalance

      // TODO: Charge the card!
    }

    const data = {
      sender: sender.username,
      receiver: receiver.username,
      amountFromBalance,
      amountFromCard,
      senderBalance: senderBalance - amountFromBalance,
      receiverBalance: receiverBalance + totalAmount,
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
