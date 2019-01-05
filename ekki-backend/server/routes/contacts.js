const express = require('express')

const { authenticate } = require('./users')
const Contact = require('../db/Contact')
const User = require('../db/User')
const { notFound, wrap } = require('../middleware')

const router = express.Router()

/**
 * Creates a new contact.
 */
router.post('/', authenticate, [
  wrap(async (req, res) => {
    const target = await User.findOne({ username: req.body.contact.username })
    if (!target) return notFound(req, res)

    const data = { _owner: res.locals.user._id, username: target.username }
    const contact = await new Contact(data).save()
    res.json({ contact })
  }),
])

module.exports = { router }
