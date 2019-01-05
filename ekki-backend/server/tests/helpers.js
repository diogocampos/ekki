const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongoose').Types

/**
 * Creates a valid auth token.
 */
const newAuthToken = (exports.newAuthToken = (_id = newId()) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET)
})

/**
 * Creates a valid MongoDB ObjectId.
 */
const newId = (exports.newId = () => {
  return new ObjectId().toHexString()
})

/**
 * Converts a MongoDB document into a Plain Old JavaScript Object
 */
exports.pojo = mongoDoc => {
  return JSON.parse(JSON.stringify(mongoDoc.toObject()))
}

/**
 * Generates a test that checks if an endpoint rejects unauthenticated requests
 */
exports.requiresAuthentication = req => {
  it('requires authentication', async () => {
    const badTokens = [
      null, // missing
      'foobar', // invalid
      newAuthToken(), // unknown
    ]
    await Promise.all(
      badTokens.map(token =>
        req()
          .set('X-Auth', token)
          .expect(401, 'Unauthorized')
      )
    )
  })
}
