const expect = require('expect')
const request = require('supertest')

const fixtures = require('./fixtures')
const { newId, requiresAuthentication } = require('./helpers')
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

  const sender = authenticated.user
  const receiver = fixtures.contactsOf(sender)[0]

  describe('with valid data', () => {
    let amount, res, expected

    specify('with enough balance', async () => {
      amount = 1
      const transfer = { to: receiver.username, amount }
      res = await req({ transfer }).expect(200)

      expected = {
        sender: sender.username,
        receiver: receiver.username,
        amountFromBalance: amount,
        amountFromCard: 0,
      }
    })

    specify('without enough balance, but with a credit card', async () => {
      const balance = fixtures.balanceOf(sender)
      amount = balance + 1
      const card = fixtures.cardsOf(sender)[0]
      const transfer = { to: receiver.username, amount, cardId: card._id }
      res = await req({ transfer }).expect(200)

      expected = {
        sender: sender.username,
        receiver: receiver.username,
        amountFromBalance: balance,
        amountFromCard: amount - balance,
      }
    })

    specify("with a large amount and the user's password", async () => {
      const threshold = fixtures.balanceOf(sender) - 1
      amount = threshold + 1
      const transfer = {
        to: receiver.username,
        amount,
        password: sender.password,
      }
      res = await fixtures.withConfirmationThreshold(threshold, () =>
        req({ transfer }).expect(200)
      )

      expected = {
        sender: sender.username,
        receiver: receiver.username,
        amountFromBalance: amount,
        amountFromCard: 0,
      }
    })

    afterEach('stores the transfer and includes info in response', async () => {
      const transferDoc = await Transfer.findById(res.body.transfer._id)
      expect(transferDoc).toMatchObject({
        ...expected,
        senderBalance: any(Number),
        receiverBalance: any(Number),
        createdAt: any(Date),
      })

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
      expect(newBalance).toEqual(oldBalance - Math.min(amount, oldBalance))
    })

    afterEach("updates the receiver's balance", async () => {
      const oldBalance = fixtures.balanceOf(receiver)
      const newBalance = await Transfer.getBalanceForUsername(receiver.username)
      expect(newBalance).toEqual(oldBalance + amount)
    })
  })

  describe('with invalid data', () => {
    it("validates the receiver's username", async () => {
      const amount = fixtures.balanceOf(sender)
      const badUsernames = [
        undefined,
        ' ',
        fixtures.fakeUsername(),
        sender.username,
      ]
      await Promise.all(
        badUsernames.map(async username => {
          const transfer = { to: username, amount }
          const res = await req({ transfer }).expect(400)
          expect(res.body).toEqual({ errors: { to: any(String) } })
        })
      )
    })

    it('validates the transfer amount', async () => {
      const badAmounts = [undefined, 0, -1, 0.5, 'foo', {}]
      await Promise.all(
        badAmounts.map(async amount => {
          const transfer = { to: receiver.username, amount }
          const res = await req({ transfer }).expect(400)
          expect(res.body).toEqual({ errors: { amount: any(String) } })
        })
      )
    })

    it('requires credit card if the balance is insufficient', async () => {
      const badCardIds = [undefined, newId()]
      await Promise.all(
        badCardIds.map(async cardId => {
          const amount = fixtures.balanceOf(sender) + 1
          const transfer = { to: receiver.username, amount }
          const res = await req({ transfer }).expect(400)
          expect(res.body).toEqual({ errors: { cardId: any(String) } })
        })
      )
    })

    it('requires password if the amount is large', async () => {
      const threshold = fixtures.balanceOf(sender) - 1
      const amount = threshold + 1
      const transfer = { to: receiver.username, amount }
      const res = await fixtures.withConfirmationThreshold(threshold, () =>
        req({ transfer }).expect(400)
      )
      expect(res.body).toEqual({ errors: { password: any(String) } })
    })

    it('rejects duplicate transfers within a short period', async () => {
      const latest = fixtures.latestTransferFrom(sender)
      const transfer = {
        to: latest.receiver,
        amount: latest.amountFromBalance + latest.amountFromCard,
      }
      const res = await req({ transfer }).expect(400)
      expect(res.body).toEqual({ errors: { amount: any(String) } })
    })

    afterEach('does not make a transfer', async () => {
      const transferDocs = await Transfer.find({})
      expect(transferDocs).toHaveLength(fixtures.transfers.length)
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
