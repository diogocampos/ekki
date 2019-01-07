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
 * Applies the patch to the contact that matches the conditions.
 */
ContactSchema.statics.patchOne = function(conditions, patch) {
  const Contact = this
  return Contact.findOneAndUpdate(
    conditions,
    { $set: patch },
    { new: true } // return the modified version, not the previous one
  )
}

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
