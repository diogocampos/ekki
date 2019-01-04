const expect = require('expect')
const request = require('supertest')

const fixtures = require('./fixtures')
const { pojo } = require('./helpers')
const app = require('../app')
const User = require('../db/User')

const { stringMatching } = expect

const BCRYPT_HASH = /^\$2a\$.{56}$/
const JSON_WEB_TOKEN = /^eyJ/

describe('POST /users', () => {
  const req = body =>
    request(app)
      .post('/users')
      .send(body)

  describe('with valid data', () => {
    let user, res, userDoc
    beforeEach(async () => {
      user = fixtures.randomUser()
      res = await req({ user }).expect(200)
      userDoc = pojo(await User.findOne({ username: user.username }))
    })

    it('creates new user with the given username', () => {
      expect(userDoc).toMatchObject({ username: user.username })
    })

    it('saves a salted hash of the given password', () => {
      expect(userDoc.password).not.toBe(user.password)
      expect(userDoc).toMatchObject({ password: stringMatching(BCRYPT_HASH) })
    })

    it('generates an auth token', async () => {
      expect(userDoc).toMatchObject({
        tokens: [stringMatching(JSON_WEB_TOKEN)],
      })
    })

    it('sets the initial balance to zero', async () => {
      const userDoc = await User.findOne({ username: user.username })
      expect(userDoc).toMatchObject({ balance: 0 })
    })
  })
})
