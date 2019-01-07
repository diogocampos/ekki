const expect = require('expect')
const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongoose').Types

/**
 * A regular expression that matches valid MongoDB object IDs.
 */
exports.OBJECT_ID = /^[0-9a-f]{24}$/

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
 * Converts a MongoDB document into a Plain Old JavaScript Object.
 */
exports.pojo = mongoDoc => {
  return JSON.parse(JSON.stringify(mongoDoc.toObject()))
}

/**
 * Generates a test that checks if an endpoint rejects unauthenticated requests.
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

/**
 * Generates a test that checks if an endpoint ignores invalid `ObjectId`s.
 */
exports.validatesId = requestById => {
  it('validates `id` parameter', async () => {
    const badIds = [
      'foobar', // invalid
      newId(), // unknown
    ]
    await Promise.all(
      badIds.map(id => requestById(id).expect(404, 'Not Found'))
    )
  })
}

/**
 * Generates a test that checks if an endpoint rejects requests with empty body.
 */
exports.rejectsEmptyRequestBody = requestWithBody => {
  it('responds with 400 if the request has no body', async () => {
    const emptyBodies = [undefined, null, '', 0, false, {}]
    await Promise.all(
      emptyBodies.map(async body => {
        const res = await requestWithBody(body)
        expect([400, 401, 404]).toContain(res.status)
      })
    )
  })
}
