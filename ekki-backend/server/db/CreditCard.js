const mongoose = require('mongoose')

const CreditCardSchema = new mongoose.Schema({
  number: {
    type: String,
  },
  expiry: {
    type: String,
  },
  holder: {
    type: String,
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
