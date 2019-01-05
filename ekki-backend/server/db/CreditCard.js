const mongoose = require('mongoose')

const VALID_CARD_NUMBER = /^\d{12,19}$/
const VALID_EXPIRY_DATE = /^(0[1-9]|1[0-2])\/\d\d$/

const CreditCardSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  number: {
    type: String,
    required: true,
    trim: true,
    match: [VALID_CARD_NUMBER, 'Card number is invalid'],
  },
  expiry: {
    type: String,
    required: true,
    trim: true,
    match: [VALID_EXPIRY_DATE, 'Card expiry date is invalid'],
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
    _id: card._id.toHexString(),
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
