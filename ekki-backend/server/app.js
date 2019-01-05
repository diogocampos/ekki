const express = require('express')

require('./config')
require('./db/connect')

const cards = require('./routes/cards')
const contacts = require('./routes/contacts')
const users = require('./routes/users')
const { wrap, ...middleware } = require('./middleware')

const app = express()

app.use(express.json())

app.use('/cards', cards.router)
app.use('/contacts', contacts.router)
app.use('/users', users.router)

if (process.env.NODE_ENV === 'test') {
  // test-only endpoints for checking the handling of internal errors
  app.get('/error/next', (req, res, next) => next(new Error('test')))
  app.get('/error/throw', () => { throw new Error('test') }) //prettier-ignore
  app.get('/error/reject', wrap(async () => { throw false })) //prettier-ignore
}

app.use(middleware.notFound)
app.use(middleware.badRequest)
app.use(middleware.internalServerError)

module.exports = app
