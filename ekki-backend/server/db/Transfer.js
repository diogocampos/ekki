const mongoose = require('mongoose')

const TransferSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  amountFromBalance: { type: Number, default: 0 },
  amountFromCard: { type: Number, default: 0 },
  senderBalance: { type: Number, required: true },
  receiverBalance: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
})

/**
 * Returns transfers that have the given username as sender or receiver.
 */
TransferSchema.statics.findByUsername = function(username) {
  const Transfer = this
  return Transfer.find(
    { $or: [{ sender: username }, { receiver: username }] },
    null,
    { sort: { createdAt: -1 } }
  )
}

/**
 * Returns the properties that should be included in response bodies.
 */
TransferSchema.methods.toJSON = function() {
  const transfer = this
  return {
    _id: transfer._id.toHexString(),
    sender: transfer.sender,
    receiver: transfer.receiver,
    amountFromBalance: transfer.amountFromBalance,
    amountFromCard: transfer.amountFromCard,
    createdAt: transfer.createdAt.getTime(),
  }
}

module.exports = mongoose.model('Transfer', TransferSchema)
