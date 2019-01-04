const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
})

UserSchema.pre('save', async function() {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }
})

module.exports = mongoose.model('User', UserSchema)
