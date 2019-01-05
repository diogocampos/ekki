const casual = require('casual')

const { newAuthToken, newId, pojo } = require('./helpers')
const User = require('../db/User')

const fakeUser = (exports.fakeUser = () => ({
  username: casual.username,
  password: casual.password,
}))

const users = (exports.users = populator(User, [
  fakeUser(),
  _id => ({
    ...fakeUser(),
    tokens: [newAuthToken(_id)],
  }),
]))

const authenticated = (exports.authenticated = req => {
  return (...args) => req(...args).set('X-Auth', authenticated.token)
})
authenticated.user = users.find(user => user.tokens.length > 0)
authenticated.token = authenticated.user.tokens[0]

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
