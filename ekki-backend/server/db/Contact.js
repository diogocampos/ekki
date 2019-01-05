const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

/**
 * Returns the properties that should be included in response bodies.
 */
ContactSchema.methods.toJSON = function() {
  const contact = this
  return {
    _id: contact._id.toHexString(),
    username: contact.username,
    favorite: contact.favorite,
  }
}

module.exports = mongoose.model('Contact', ContactSchema)
