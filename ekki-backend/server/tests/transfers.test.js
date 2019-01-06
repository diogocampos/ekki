const expect = require('expect')
const request = require('supertest')

const fixtures = require('./fixtures')
const { requiresAuthentication } = require('./helpers')
const app = require('../app')
const Transfer = require('../db/Transfer')

const { any } = expect
const { authenticated } = fixtures

describe('POST /transfers', () => {
  const req = authenticated(body =>
    request(app)
      .post('/transfers')
      .send(body)
  )

  requiresAuthentication(req)

  describe('with valid data', () => {
    const sender = authenticated.user
    const receiver = fixtures.contactsOf(sender)[0]
    let amount

    specify('with enough balance', async () => {
      amount = 1
      const transfer = { to: receiver.username, amount }
      const res = await req({ transfer }).expect(200)

      const expected = {
        sender: sender.username,
        receiver: receiver.username,
        amountFromBalance: amount,
        amountFromCard: 0,
      }

      // stores the transfer in the database
      const transferDoc = await Transfer.findById(res.body.transfer._id)
      expect(transferDoc).toMatchObject({
        ...expected,
        senderBalance: any(Number),
        receiverBalance: any(Number),
        createdAt: any(Date),
      })

      // includes info in response body
      expect(res.body).toEqual({
        transfer: {
          ...expected,
          createdAt: transferDoc.createdAt.getTime(),
          _id: transferDoc._id.toHexString(),
        },
      })
    })

    afterEach("updates the sender's balance", async () => {
      const oldBalance = fixtures.balanceOf(sender)
      const newBalance = await Transfer.getBalanceForUsername(sender.username)
      expect(newBalance).toEqual(oldBalance - amount)
    })

    afterEach("updates the receiver's balance", async () => {
      const oldBalance = fixtures.balanceOf(receiver)
      const newBalance = await Transfer.getBalanceForUsername(receiver.username)
      expect(newBalance).toEqual(oldBalance + amount)
    })
  })
})

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
