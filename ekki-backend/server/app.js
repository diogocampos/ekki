const express = require('express')

const { internalServerError, notFound, wrap } = require('./middleware')

require('./config')

const app = express()

if (process.env.NODE_ENV === 'test') {
  // test-only endpoints for checking the handling of internal errors
  app.get('/error/next', (req, res, next) => next(new Error('test')))
  app.get('/error/throw', () => { throw new Error('test') }) //prettier-ignore
  app.get('/error/reject', wrap(async () => { throw false })) //prettier-ignore
}

app.use(notFound)
app.use(internalServerError)

module.exports = app
