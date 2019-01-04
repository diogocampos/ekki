const express = require('express')

require('./config')
require('./db/connect')

const users = require('./routers/users')
const { internalServerError, notFound, wrap } = require('./middleware')

const app = express()

app.use(express.json())

app.use('/users', users.router)

if (process.env.NODE_ENV === 'test') {
  // test-only endpoints for checking the handling of internal errors
  app.get('/error/next', (req, res, next) => next(new Error('test')))
  app.get('/error/throw', () => { throw new Error('test') }) //prettier-ignore
  app.get('/error/reject', wrap(async () => { throw false })) //prettier-ignore
}

app.use(notFound)
app.use(internalServerError)

module.exports = app
