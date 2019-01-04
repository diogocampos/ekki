const casual = require('casual')
const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongoose').Types

const { pojo } = require('./helpers')
const User = require('../db/User')

const fakeUser = (exports.fakeUser = () => ({
  username: casual.username,
  password: casual.password,
}))

const newAuthToken = (exports.newAuthToken = (_id = newId()) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET)
})

const users = (exports.users = populator(User, [
  fakeUser(),
  _id => ({
    ...fakeUser(),
    tokens: [newAuthToken(_id)],
  }),
]))

const authenticated = (exports.authenticated = req => {
  const token = authenticated.user.tokens[0]
  return (...args) => req(...args).set('X-Auth', token)
})
authenticated.user = userWithTokens()

// Helpers

function newId() {
  return new ObjectId().toHexString()
}

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

function userWithTokens() {
  return users.find(user => user.tokens.length > 0)
}
