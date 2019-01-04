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
 * An error handler that responds with 500 Internal Server Error.
 */
exports.internalServerError = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err)
  res.sendStatus(500)
}
