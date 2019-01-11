const express = require('express')

const { authenticate } = require('./users')
const Contact = require('../db/Contact')
const User = require('../db/User')
const {
  badRequest,
  EkkiError,
  notFound,
  validateId,
  wrap,
} = require('../middleware')

const router = express.Router()

router.param('_id', validateId)

/**
 * Creates a new contact.
 */
router.post('/', authenticate, [
  wrap(async (req, res) => {
    const { user } = res.locals
    const { username } = req.body.contact || {}

    // TODO: Use a unique compound index for (_owner, username) ?

    const [targetUser, existingContact] = await Promise.all([
      User.findOne({ username }),
      Contact.findOne({ _owner: user._id, username }),
    ])
    if (!targetUser) {
      throw new EkkiError({ username: 'Username does not exist' }, 404)
    }
    if (targetUser.username === user.username) {
      throw new EkkiError({ username: "You can't add a contact to yourself" })
    }
    if (existingContact) {
      throw new EkkiError({ username: 'Contact already exists' })
    }

    const data = { _owner: user._id, username: targetUser.username }
    const contact = await new Contact(data).save()
    res.json({ contact })
  }),
])

/**
 * Returns the user's contacts.
 */
router.get('/', authenticate, [
  wrap(async (req, res) => {
    const { user } = res.locals
    const contacts = await Contact.find({ _owner: user._id })
    res.json({ contacts })
  }),
])

/**
 * Marks or unmarks a contact as favorite.
 */
router.patch('/:_id', authenticate, [
  wrap(async (req, res) => {
    const { _id } = req.params
    const { user } = res.locals
    const { favorite } = req.body.patch || {}

    const contact = await Contact.patchOne(
      { _id, _owner: user._id },
      { favorite: !!favorite }
    )
    contact ? res.json({ contact }) : notFound(req, res)
  }),
])

/**
 * Deletes a contact.
 */
router.delete('/:_id', authenticate, [
  wrap(async (req, res) => {
    const { _id } = req.params
    const { user } = res.locals
    const contact = await Contact.findOneAndDelete({ _id, _owner: user._id })
    contact ? res.sendStatus(200) : notFound(req, res)
  }),
])

module.exports = { router }
