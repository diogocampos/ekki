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
    const { to, amount, cardId, password } = req.body.transfer
    const sender = res.locals.user

    const totalAmount = +amount
    if (totalAmount <= 0 || !Number.isInteger(totalAmount)) {
      throw new EkkiError({ amount: 'Amount must be a positive integer' })
    }

    if (to === sender.username) {
      throw new EkkiError({ to: 'Receiver must be a different user' })
    }

    if (await Transfer.isDuplicate(sender, receiver, totalAmount)) {
      throw new EkkiError({ amount: 'Transfer rejected as duplicate' })
    }

    const receiver = await User.findOne({ username: to })
    if (!receiver) throw new EkkiError({ to: 'Receiver does not exist' })

    const [senderBalance, receiverBalance] = await Promise.all([
      Transfer.getBalanceForUsername(sender.username),
      Transfer.getBalanceForUsername(receiver.username),
    ])

    if (totalAmount > Transfer.CONFIRMATION_THRESHOLD) {
      // large amount: require password
      const user = await User.findByCredentials(sender.username, password)
      if (!user) {
        const threshold = formatCurrency(Transfer.CONFIRMATION_THRESHOLD)
        throw new EkkiError({
          password: `Password is required for amounts above $${threshold}`,
        })
      }
    }

    let amountFromBalance = totalAmount
    let amountFromCard = 0

    if (totalAmount > senderBalance) {
      // insufficient balance: require credit card id
      if (!cardId) {
        throw new EkkiError({
          cardId: 'Credit card ID is required when the balance is insufficient',
        })
      }

      const card = await CreditCard.findOne({ _id: cardId, _owner: sender._id })
      if (!card) {
        throw new EkkiError({
          cardId: 'Credit card ID must be of an existing card',
        })
      }

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

// Helpers

function formatCurrency(cents) {
  return (cents / 100).toFixed(2)
}
