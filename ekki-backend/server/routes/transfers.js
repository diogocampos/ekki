const express = require('express')

const { authenticate } = require('./users')
const CreditCard = require('../db/CreditCard')
const Transfer = require('../db/Transfer')
const User = require('../db/User')
const { EkkiError, wrap } = require('../middleware')

const router = express.Router()

/**
 * Makes a transfer to another user.
 */
router.post('/', authenticate, [
  wrap(async (req, res) => {
    const { to, amount, cardId, password } = req.body.transfer || {}
    const sender = res.locals.user

    // Validate amount

    const totalAmount = +amount
    if (totalAmount <= 0 || !Number.isInteger(totalAmount)) {
      throw new EkkiError({ amount: 'Amount must be a positive integer' })
    }

    // Validate receiver

    const receiver = await User.findOne({ username: to })
    if (!receiver) throw new EkkiError({ to: 'Receiver does not exist' })

    if (receiver.username === sender.username) {
      throw new EkkiError({ to: 'Receiver must be a different user' })
    }

    // Check for duplicate transfers

    if (await Transfer.isDuplicate(sender, receiver, totalAmount)) {
      throw new EkkiError({ amount: 'Transfer rejected as duplicate' })
    }

    // Check if amount is larger than the threshold

    if (totalAmount > Transfer.CONFIRMATION_THRESHOLD) {
      // large amount: require password
      if (!password) {
        throw new EkkiError({ password: 'Password required for large amounts' })
      }
      const isCorrect = await sender.checkCredentials(password)
      if (!isCorrect) throw new EkkiError({ password: 'Password is incorrect' })
    }

    // Check if amount is larger than the sender's balance

    const senderBalance = await Transfer.getBalanceForUser(sender)
    let amountFromBalance = totalAmount
    let amountFromCard = 0

    if (totalAmount > senderBalance) {
      // insufficient balance: require credit card id
      if (!cardId) {
        throw new EkkiError({ cardId: 'Card required, insufficient balance' })
      }

      const card = await CreditCard.findOne({ _id: cardId, _owner: sender._id })
      if (!card) {
        throw new EkkiError({ cardId: 'Credit card ID must be valid' })
      }

      amountFromBalance = senderBalance
      amountFromCard = totalAmount - amountFromBalance

      // TODO: Charge the card!
    }

    // Make the transfer

    const transfer = await Transfer.doIt({
      sender,
      receiver,
      amountFromBalance,
      amountFromCard,
    })
    res.json({ transfer })
  }),
])

/**
 * Returns the user's history of sent and received transfers.
 */
router.get('/', authenticate, [
  wrap(async (req, res) => {
    const { user } = res.locals
    const transfers = await Transfer.findByUser(user)
    res.json({ transfers })
  }),
])

module.exports = { router }
