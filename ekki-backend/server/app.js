const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

require('./config')
require('./db/connect')

const balance = require('./routes/balance')
const cards = require('./routes/cards')
const contacts = require('./routes/contacts')
const transfers = require('./routes/transfers')
const users = require('./routes/users')
const { wrap, ...middleware } = require('./middleware')

const app = express()

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(cors({ exposedHeaders: 'X-Auth' }))
app.use(express.json())

app.use('/balance', balance.router)
app.use('/cards', cards.router)
app.use('/contacts', contacts.router)
app.use('/transfers', transfers.router)
app.use('/users', users.router)

if (process.env.NODE_ENV === 'test') {
  // test-only endpoints for checking the handling of internal errors
  app.get('/error/next', (req, res, next) => next(new Error('test')))
  app.get('/error/throw', () => { throw new Error('test') }) //prettier-ignore
  app.get('/error/reject', wrap(async () => { throw false })) //prettier-ignore
}

app.use(middleware.notFound)

app.use(middleware.handleValidationError)
app.use(middleware.handleInternalError)

module.exports = app
