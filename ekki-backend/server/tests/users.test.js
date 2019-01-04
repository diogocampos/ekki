const expect = require('expect')
const request = require('supertest')

const fixtures = require('./fixtures')
const app = require('../app')
const User = require('../db/User')

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
  })
})
