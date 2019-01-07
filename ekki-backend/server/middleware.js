const mongoose = require('mongoose')

/**
 * A wrapper for `async` route handlers, to avoid always having to include a
 * try/catch block inside them.
 */
exports.wrap = asyncHandler => {
  return async (req, res, next) => {
    try {
      await asyncHandler(req, res, next)
    } catch (err) {
      next(err || new Error(`Promise rejected with: ${err}`))
    }
  }
}

/**
 * A param callback for routes with an `_id` parameter.
 * http://expressjs.com/en/4x/api.html#router.param
 */
exports.validateId = (req, res, next, _id) => {
  if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
    return notFound(req, res)
  }
  next()
}

/**
 * A handler that responds with 400 Bad Request.
 */
exports.badRequest = sendStatus(400)

/**
 * A handler that responds with 401 Unauthorized.
 */
exports.unauthorized = sendStatus(401)

/**
 * A handler that responds with 404 Not Found.
 */
const notFound = (exports.notFound = sendStatus(404))

/**
 * A custom error constructor.
 */
const EkkiError = (exports.EkkiError = function(errors) {
  this.errors = errors
})

/**
 * An error handler that responds to validation errors with 400 Bad Request.
 */
exports.handleValidationError = (err, req, res, next) => {
  if (err instanceof EkkiError) {
    return res.status(400).json({ errors: err.errors })
  }
  if (err.name === 'ValidationError') {
    const errors = {}
    for (const [path, { message }] of Object.entries(err.errors)) {
      errors[path] = message
    }
    return res.status(400).json({ errors })
  }
  next(err)
}

/**
 * An error handler that responds with 500 Internal Server Error.
 */
exports.handleInternalError = (err, req, res, next) => {
  if (!req.path.startsWith('/error/')) console.error(err)
  res.sendStatus(500)
}

// Helpers

function sendStatus(code) {
  return (req, res) => res.sendStatus(code)
}
