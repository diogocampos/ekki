const casual = require('casual')

exports.randomUser = () => ({
  username: casual.username,
  password: casual.password,
})
