/**
 * A wrapper for async route handlers, to avoid always having to include a
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
 * A handler that responds with 401 Unauthorized
 */
exports.unauthorized = sendStatus(401)

/**
 * A handler that responds with 404 Not Found.
 */
exports.notFound = sendStatus(404)

/**
 * An error handler that responds with 400 Bad Request
 */
exports.badRequest = (err, req, res, next) => {
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
exports.internalServerError = (err, req, res, next) => {
  if (!req.path.startsWith('/error/')) console.error(err)
  res.sendStatus(500)
}

// Helpers

function sendStatus(code) {
  return (req, res) => res.sendStatus(code)
}
