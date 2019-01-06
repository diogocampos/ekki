const expect = require('expect')
const request = require('supertest')

const fixtures = require('./fixtures')
const { requiresAuthentication } = require('./helpers')
const app = require('../app')

const { authenticated } = fixtures

beforeEach(fixtures.transfers.populate)

describe('GET /balance', () => {
  const req = authenticated(() => request(app).get('/balance'))

  requiresAuthentication(req)

  it("returns the user's current balance", async () => {
    const res = await req().expect(200)
    expect(res.body).toEqual({
      balance: fixtures.balanceOf(authenticated.user),
    })
  })
})
