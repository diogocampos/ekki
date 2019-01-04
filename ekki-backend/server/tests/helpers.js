const fixtures = require('./fixtures')

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
      fixtures.newAuthToken(), // unknown
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
