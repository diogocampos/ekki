const mongoose = require('mongoose')

const TransferSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  amountFromBalance: { type: Number, validate: Number.isInteger },
  amountFromCard: { type: Number, validate: Number.isInteger },
  senderBalance: { type: Number, validate: Number.isInteger },
  receiverBalance: { type: Number, validate: Number.isInteger },
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
 * Returns transfers that have the given user as sender OR receiver.
 */
TransferSchema.statics.findByUser = function({ username }) {
  const Transfer = this
  return Transfer.find(
    { $or: [{ sender: username }, { receiver: username }] },
    null,
    { sort: { createdAt: -1 } }
  )
}

/**
 * Returns the latest transfer with the given user as sender.
 */
TransferSchema.statics.getLatestFromSender = async function({ username }) {
  const Transfer = this
  const [latest] = await Transfer.find({ sender: username }, null, {
    sort: { createdAt: -1 },
    limit: 1,
  })
  return latest
}

/**
 * Returns the balance for the given user.
 */
TransferSchema.statics.getBalanceForUser = async function(user) {
  const Transfer = this
  const [latest] = await Transfer.findByUser(user).limit(1)

  if (!latest) return 0
  if (latest.sender === user.username) return latest.senderBalance
  if (latest.receiver === user.username) return latest.receiverBalance
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
 * Makes a transfer.
 * TODO: This should be an atomic transaction.
 */
TransferSchema.statics.doIt = async function({
  sender,
  receiver,
  amountFromBalance,
  amountFromCard,
}) {
  const Transfer = this
  const [senderBalance, receiverBalance] = await Promise.all([
    Transfer.getBalanceForUser(sender),
    Transfer.getBalanceForUser(receiver),
  ])
  return new Transfer({
    sender: sender.username,
    receiver: receiver.username,
    amountFromBalance,
    amountFromCard,
    senderBalance: senderBalance - amountFromBalance,
    receiverBalance: receiverBalance + amountFromBalance + amountFromCard,
  }).save()
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
