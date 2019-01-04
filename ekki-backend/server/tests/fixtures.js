const casual = require('casual')

const User = require('../db/User')

exports.users = populator(User, [])

exports.fakeUser = fakeUser
function fakeUser() {
  return {
    username: casual.username,
    password: casual.password,
  }
}

// Helpers

function populator(Model, items) {
  items.populate = async () => {
    await Model.deleteMany({})
    await Promise.all(items.map(item => new Model(item).save()))
  }
  return items
}
