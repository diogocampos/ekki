const casual = require('casual')

const { newAuthToken, newId, pojo } = require('./helpers')
const Contact = require('../db/Contact')
const CreditCard = require('../db/CreditCard')
const User = require('../db/User')

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

function userDifferentFrom(user) {
  return users.find(u => u.username !== user.username)
}

const authenticated = (exports.authenticated = req => {
  return (...args) => req(...args).set('X-Auth', authenticated.token)
})
authenticated.user = users.find(user => user.tokens.length > 0)
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
    username: userDifferentFrom(authenticated.user).username,
    _owner: authenticated.user._id,
  },
]))

const contactsOf = (exports.contactsOf = user => {
  return contacts.filter(contact => contact._owner === user._id)
})

// CreditCard fixtures

const fakeCard = (exports.fakeCard = () => ({
  number: casual.card_number(),
  expiry: casual.card_exp,
  holder: casual.full_name,
}))

const cards = (exports.cards = populator(CreditCard, [
  {
    ...fakeCard(),
    _user: authenticated.user._id,
  },
  {
    ...fakeCard(),
    _user: newId(),
  },
]))

exports.cardsOf = user => {
  return cards.filter(card => card._user === user._id)
}

exports.cardNotOf = user => {
  return cards.find(card => card._user !== user._id)
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
