const expect = require('expect')
const request = require('supertest')

const fixtures = require('./fixtures')
const { requiresAuthentication } = require('./helpers')
const app = require('../app')
const Transfer = require('../db/Transfer')

const { authenticated } = fixtures

describe('GET /transfers', () => {
  const req = authenticated(() => request(app).get('/transfers'))

  requiresAuthentication(req)

  it("returns the user's history of sent and received transfers", async () => {
    const res = await req().expect(200)
    expect(res.body).toEqual({
      transfers: fixtures
        .transfersOf(authenticated.user)
        .map(data => new Transfer(data).toJSON()),
    })
  })
})
