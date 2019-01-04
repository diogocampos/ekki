const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  balance: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
  },
  tokens: [
    {
      type: String,
      required: true,
    },
  ],
})

UserSchema.methods.generateAuthToken = async function() {
  const user = this
  const payload = { _id: user._id.toHexString() }
  const token = jwt.sign(payload, process.env.JWT_SECRET)

  user.tokens.unshift(token)
  await user.save()
  return token
}

UserSchema.pre('save', async function() {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }
})

module.exports = mongoose.model('User', UserSchema)
