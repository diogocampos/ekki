const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const VALID_USERNAME = /^[a-z\d]+([_.][a-z\d]+)*$/

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    lowercase: true,
    unique: true,
    match: [VALID_USERNAME, 'Username is invalid'],
  },
  balance: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [5, 'Password must be at least 5 characters long'],
  },
  tokens: [
    {
      type: String,
      required: true,
    },
  ],
})

UserSchema.plugin(uniqueValidator, { message: 'Username already exists' })

UserSchema.statics.findByCredentials = async function(username, password) {
  const User = this
  const user = await User.findOne({ username })
  if (!user) return null

  const isCorrectPassword = await bcrypt.compare(password, user.password)
  return isCorrectPassword ? user : null
}

UserSchema.methods.generateAuthToken = async function() {
  const user = this
  const payload = { _id: user._id.toHexString() }
  const token = jwt.sign(payload, process.env.JWT_SECRET)

  user.tokens.unshift(token)
  await user.save()
  return token
}

UserSchema.methods.toJSON = function() {
  const user = this
  return {
    username: user.username,
    balance: user.balance,
  }
}

UserSchema.pre('save', async function() {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }
})

module.exports = mongoose.model('User', UserSchema)
