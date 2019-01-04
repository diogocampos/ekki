const expect = require('expect')
const request = require('supertest')

const fixtures = require('./fixtures')
const app = require('../app')
const User = require('../db/User')

const { stringMatching } = expect

const BCRYPT_HASH = /^\$2a\$.{56}$/

describe('POST /users', () => {
  const req = body =>
    request(app)
      .post('/users')
      .send(body)

  describe('with valid data', () => {
    let user, res
    beforeEach(async () => {
      user = fixtures.randomUser()
      res = await req({ user }).expect(200)
    })

    it('creates new user with the given username', async () => {
      const userDoc = await User.findOne({ username: user.username })
      expect(userDoc).toMatchObject({ username: user.username })
    })

    it('saves a salted hash of the given password', async () => {
      const userDoc = await User.findOne({ username: user.username })
      expect(userDoc.password).not.toBe(user.password)
      expect(userDoc).toMatchObject({ password: stringMatching(BCRYPT_HASH) })
    })
  })
})
