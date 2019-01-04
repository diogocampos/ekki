const casual = require('casual')

const { pojo } = require('./helpers')
const User = require('../db/User')

exports.users = populator(User, [fakeUser()])

exports.fakeUser = fakeUser
function fakeUser() {
  return {
    username: casual.username,
    password: casual.password,
  }
}

// Helpers

function populator(Model, items) {
  items = items.map(item => pojo(new Model(item)))

  items.populate = async () => {
    await Model.deleteMany({})
    await Promise.all(items.map(item => new Model(item).save()))
  }

  return items
}
