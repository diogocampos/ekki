const mongoose = require('mongoose')

const TransferSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  amountFromBalance: { type: Number, required: true },
  amountFromCard: { type: Number, required: true },
  senderBalance: { type: Number, required: true },
  receiverBalance: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
})

/**
 * The maximum transfer amount that doesn't require password confirmation.
 */
TransferSchema.statics.CONFIRMATION_THRESHOLD = 1000 * 100 // in cents

/**
 * The amount of time to wait before accepting transfers from the same sender,
 * with the same receiver and amount.
 */
TransferSchema.statics.GRACE_PERIOD = 120 * 1000 // in milliseconds

/**
 * Returns transfers that have the given username as sender OR receiver.
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
 * Returns the balance for the given username.
 */
TransferSchema.statics.getBalanceForUsername = async function(username) {
  const Transfer = this
  const [latest] = await Transfer.findByUsername(username).limit(1)

  if (!latest) return 0
  if (latest.sender === username) return latest.senderBalance
  if (latest.receiver === username) return latest.receiverBalance
}

/**
 * Returns the latest transfer with the given username as sender.
 */
TransferSchema.statics.getLatestFromSender = async function(username) {
  const Transfer = this
  const [latest] = await Transfer.find({ sender: username }, null, {
    sort: { createdAt: -1 },
    limit: 1,
  })
  return latest
}

/**
 * Checks if the sender has just made an identical transfer.
 */
TransferSchema.statics.isDuplicate = async function(sender, receiver, amount) {
  const Transfer = this
  const latest = await Transfer.getLatestFromSender(sender)
  return (
    receiver.username === latest.receiver &&
    amount === latest.amountFromBalance + latest.amountFromCard &&
    Date.now() - latest.createdAt.getTime() < Transfer.GRACE_PERIOD
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
