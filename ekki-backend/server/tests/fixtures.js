const casual = require('casual')

const { newAuthToken, newId, pojo } = require('./helpers')
const Contact = require('../db/Contact')
const CreditCard = require('../db/CreditCard')
const User = require('../db/User')
const Transfer = require('../db/Transfer')

// User fixtures

const fakeUser = (exports.fakeUser = () => ({
  username: casual.username,
  password: casual.password,
}))

exports.fakeUsername = () => casual.username

const users = (exports.users = populator(User, [
  _id => ({
    ...fakeUser(),
    tokens: [newAuthToken(_id)],
  }),
  fakeUser(),
  fakeUser(),
]))

const authenticated = (exports.authenticated = req => {
  return (...args) => req(...args).set('X-Auth', authenticated.token)
})
authenticated.user = users[0]
authenticated.token = authenticated.user.tokens[0]

// Contact fixtures

exports.newContactFor = user => {
  const contacts = contactsOf(user)
  const target = users.find(
    target =>
      target.username !== user.username &&
      !contacts.find(contact => contact.username === target.username)
  )
  return { username: target.username }
}

const contacts = (exports.contacts = populator(Contact, [
  {
    _owner: users[0]._id,
    username: users[1].username,
  },
  {
    _owner: users[1]._id,
    username: users[2].username,
  },
]))

const contactsOf = (exports.contactsOf = user => {
  return contacts.filter(contact => contact._owner === user._id)
})

exports.contactNotOf = user => {
  return contacts.find(contact => contact._owner !== user._id)
}

// CreditCard fixtures

const fakeCard = (exports.fakeCard = () => ({
  number: casual.card_number(),
  expiry: casual.card_exp,
  holder: casual.full_name,
}))

const cards = (exports.cards = populator(CreditCard, [
  {
    ...fakeCard(),
    _owner: users[0]._id,
  },
  {
    ...fakeCard(),
    _owner: users[1]._id,
  },
]))

exports.cardsOf = user => {
  return cards.filter(card => card._owner === user._id)
}

exports.cardNotOf = user => {
  return cards.find(card => card._owner !== user._id)
}

// Transfer fixtures

const balances = {
  [users[0].username]: 10,
  [users[1].username]: 20,
  [users[2].username]: 30,
}

const transfers = (exports.transfers = populator(Transfer, [
  {
    sender: users[0].username,
    receiver: users[1].username,
    amountFromBalance: 2,
    amountFromCard: 0,
    senderBalance: (balances[users[0].username] -= 2),
    receiverBalance: (balances[users[1].username] += 2),
  },
  {
    sender: users[2].username,
    receiver: users[0].username,
    amountFromBalance: 0,
    amountFromCard: 3,
    senderBalance: (balances[users[2].username] -= 3),
    receiverBalance: (balances[users[0].username] += 3),
  },
  {
    sender: users[2].username,
    receiver: users[1].username,
    amountFromBalance: 2,
    amountFromCard: 2,
    senderBalance: (balances[users[2].username] -= 4),
    receiverBalance: (balances[users[1].username] += 4),
  },
]).reverse())

exports.transfersOf = ({ username }) => {
  return transfers.filter(t => t.sender === username || t.receiver === username)
}

exports.latestTransferFrom = user => {
  return transfers.find(transfer => transfer.sender === user.username)
}

exports.balanceOf = user => {
  return balances[user.username]
}

exports.withConfirmationThreshold = async (tempThreshold, fn) => {
  const originalThreshold = Transfer.CONFIRMATION_THRESHOLD
  Transfer.CONFIRMATION_THRESHOLD = tempThreshold
  try {
    return await fn()
  } finally {
    Transfer.CONFIRMATION_THRESHOLD = originalThreshold
  }
}

// Helpers

function populator(Model, items) {
  items = items.map(arg => {
    const _id = newId()
    const data = typeof arg === 'function' ? arg(_id) : arg
    return pojo(new Model({ _id, ...data }))
  })

  items.populate = async () => {
    await Model.deleteMany({})
    await Promise.all(items.map(item => new Model(item).save()))
  }

  return items
}
