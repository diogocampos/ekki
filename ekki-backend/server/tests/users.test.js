const expect = require('expect')
const { pick } = require('lodash')
const request = require('supertest')

const fixtures = require('./fixtures')
const { pojo, requiresAuthentication } = require('./helpers')
const app = require('../app')
const User = require('../db/User')

const { any, stringMatching } = expect
const { authenticated } = fixtures

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
      expect(userDoc.username).toBe(user.username.toLowerCase())
    })

    it('saves a salted hash of the given password', () => {
      expect(userDoc.password).not.toBe(user.password)
      expect(userDoc.password).toMatch(BCRYPT_HASH)
    })

    it('generates an auth token', async () => {
      expect(userDoc).toMatchObject({
        tokens: [stringMatching(JSON_WEB_TOKEN)],
      })
    })

    it('includes user info in response body', () => {
      expect(res.body).toEqual({
        user: { username: user.username.toLowerCase() },
      })
    })

    it('includes auth token in response header', () => {
      expect(res.headers['x-auth']).toMatch(JSON_WEB_TOKEN)
    })
  })

  describe('with invalid data', () => {
    it('checks if username is invalid', async () => {
      const invalidUsernames = [undefined, '', ' ', '!@#$', {}, [], null]
      await Promise.all(
        invalidUsernames.map(async username => {
          const user = { username, password: '12345' }
          const res = await req({ user }).expect(400)
          expect(res.body).toEqual({ errors: { username: any(String) } })
        })
      )
    })

    it('checks if username already exists', async () => {
      const user = { username: fixtures.users[0].username, password: '12345' }
      const res = await req({ user }).expect(400)
      expect(res.body).toEqual({ errors: { username: any(String) } })
    })

    it('checks if password is too short', async () => {
      const user = { username: fixtures.fakeUsername(), password: '1234' }
      const res = await req({ user }).expect(400)
      expect(res.body).toEqual({ errors: { password: any(String) } })
    })

    afterEach('does not create a new user', async () => {
      const users = await User.find()
      expect(users).toHaveLength(fixtures.users.length)
    })
  })
})

describe('POST /users/login', () => {
  const req = body =>
    request(app)
      .post('/users/login')
      .send(body)

  describe('with valid credentials', async () => {
    let user, res, token, userDoc
    beforeEach(async () => {
      user = fixtures.users[0]
      res = await req({ user: pick(user, 'username', 'password') }).expect(200)
      token = res.headers['x-auth']
      userDoc = await User.findById(user._id)
    })

    it('generates and stores a new auth token', () => {
      expect(user.tokens).not.toContainEqual(token)
      expect(userDoc.tokens).toHaveLength(user.tokens.length + 1)
    })

    it('returns user info with auth token in header', () => {
      const { username } = user
      expect(userDoc.tokens).toContainEqual(token)
      expect(res.body).toEqual({ user: { username } })
    })
  })

  describe('with invalid credentials', () => {
    let res

    it('responds with 401 if the username does not exist', async () => {
      const user = fixtures.fakeUser()
      res = await req({ user }).expect(401, 'Unauthorized')
    })

    it('does not creat a token if the password is incorrect', async () => {
      const { _id, username, password, tokens } = fixtures.users[0]
      const user = { username, password: `wrong${password}` }
      res = await req({ user }).expect(401, 'Unauthorized')

      const userDoc = pojo(await User.findById(_id))
      expect(userDoc.tokens).toEqual(tokens)
    })

    afterEach('does not return an auth token', () => {
      expect(res.headers['x-auth']).toBeUndefined()
    })
  })
})

describe('GET /users/me', () => {
  const req = authenticated(() => request(app).get('/users/me'))

  requiresAuthentication(req)

  it('returns the authenticated user', async () => {
    const res = await req().expect(200)
    expect(res.body).toEqual({
      user: { username: authenticated.user.username },
    })
  })
})

describe('DELETE /users/me/token', () => {
  const req = authenticated(() => request(app).delete('/users/me/token'))

  requiresAuthentication(req)

  it('deletes the auth token', async () => {
    await req().expect(200, 'OK')
    const { username, tokens } = authenticated.user
    const userDoc = await User.findOne({ username })
    expect(userDoc.tokens).toHaveLength(tokens.length - 1)
    expect(userDoc.tokens).not.toContain(authenticated.token)
  })
})
