const express = require('express')

const { authenticate } = require('./users')
const Contact = require('../db/Contact')
const User = require('../db/User')
const { badRequest, notFound, wrap } = require('../middleware')

const router = express.Router()

/**
 * Creates a new contact.
 */
router.post('/', authenticate, [
  wrap(async (req, res) => {
    const { user } = res.locals
    const { username } = req.body.contact

    // TODO use a compound unique index for (_owner, username) ?

    const [targetUser, existingContact] = await Promise.all([
      User.findOne({ username }),
      Contact.findOne({ _owner: user._id, username }),
    ])
    if (!targetUser) return notFound(req, res)
    if (existingContact) return badRequest(req, res)

    const data = { _owner: user._id, username: targetUser.username }
    const contact = await new Contact(data).save()
    res.json({ contact })
  }),
])

module.exports = { router }
