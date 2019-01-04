const expect = require('expect')
const request = require('supertest')

const fixtures = require('./fixtures')
const { pojo } = require('./helpers')
const app = require('../app')
const User = require('../db/User')

const { any, stringMatching } = expect

const BCRYPT_HASH = /^\$2a\$.{56}$/
const JSON_WEB_TOKEN = /^eyJ/

beforeEach(fixtures.users.populate)

describe('POST /users', () => {
  const req = body =>
    request(app)
      .post('/users')
      .send(body)

  describe('with valid data', () => {
    let user, res, userDoc
    beforeEach(async () => {
      user = fixtures.fakeUser()
      res = await req({ user }).expect(200)
      userDoc = pojo(await User.findOne({ username: user.username }))
    })

    it('creates new user with the given username', () => {
      expect(userDoc).toMatchObject({ username: user.username.toLowerCase() })
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

    it('responds with minimal user info in body', () => {
      expect(res.body.user).toEqual({
        username: user.username.toLowerCase(),
        balance: 0,
      })
    })

    it('responds with auth token in header', () => {
      expect(res.headers['x-auth']).toMatch(JSON_WEB_TOKEN)
    })
  })

  describe('validation', () => {
    afterEach(async () => {
      // check that a new user has not been created
      const users = await User.find()
      expect(users).toHaveLength(fixtures.users.length)
    })

    it('checks if username is invalid', async () => {
      const invalidUsernames = [undefined, '', ' ', '!@#$', {}, [], null]
      await Promise.all(
        invalidUsernames.map(async username => {
          const user = { username, password: 'password' }
          const res = await req({ user }).expect(400)
          expect(res.body).toEqual({ errors: { username: any(String) } })
        })
      )
    })

    it('checks if username already exists', async () => {
      const user = fixtures.users[0]
      const res = await req({ user }).expect(400)
      expect(res.body).toEqual({ errors: { username: any(String) } })
    })
  })
})
