const mongoose = require('mongoose')

const VALID_CARD_NUMBER = /^\d{12,19}$/

const CreditCardSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    trim: true,
    match: [VALID_CARD_NUMBER, 'Card number is invalid'],
  },
  expiry: {
    type: String,
  },
  holder: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, 'Card holder is required'],
  },
})

/**
 * Returns the properties that should be included in response bodies.
 */
CreditCardSchema.methods.toJSON = function() {
  const card = this
  return {
    _id: card._id,
    number: maskCreditCardNumber(card.number),
    expiry: card.expiry,
    holder: card.holder,
  }
}

module.exports = mongoose.model('CreditCard', CreditCardSchema)

// Helpers

/**
 * Replaces digits with asterisks, except for the last four.
 */
function maskCreditCardNumber(number) {
  const maskLength = number.length - 4
  return Array(maskLength + 1).join('*') + number.slice(maskLength)
}
