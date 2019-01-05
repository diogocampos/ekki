const expect = require('expect')
const request = require('supertest')

const fixtures = require('./fixtures')
const { requiresAuthentication } = require('./helpers')
const app = require('../app')
const CreditCard = require('../db/CreditCard')

const { stringMatching } = expect
const { authenticated } = fixtures

const MASKED_CREDIT_CARD_NUMBER = /^[*]+\d{4}$/
const OBJECT_ID = /^[0-9a-f]{24}$/

describe('POST /cards', () => {
  const req = authenticated(body =>
    request(app)
      .post('/cards')
      .send(body)
  )

  requiresAuthentication(req)

  describe('with valid data', () => {
    let card, res
    beforeEach(async () => {
      card = fixtures.fakeCard()
      res = await req({ card }).expect(200)
    })

    it('stores a new credit card', async () => {
      const cardDoc = await CreditCard.findById(res.body.card._id)
      expect(cardDoc).toMatchObject(card)
    })

    it('includes card info in response body', () => {
      expect(res.body).toEqual({
        card: {
          ...card,
          _id: stringMatching(OBJECT_ID),
          number: stringMatching(MASKED_CREDIT_CARD_NUMBER),
        },
      })
    })
  })
})
