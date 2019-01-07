const expect = require('expect')
const request = require('supertest')

const fixtures = require('./fixtures')
const {
  newId,
  OBJECT_ID,
  pojo,
  requiresAuthentication,
  validatesId,
} = require('./helpers')
const app = require('../app')
const CreditCard = require('../db/CreditCard')

const { any, objectContaining, stringMatching } = expect
const { authenticated } = fixtures

const MASKED_CREDIT_CARD_NUMBER = /^[*]+\d{4}$/

describe('POST /cards', () => {
  const req = authenticated(body =>
    request(app)
      .post('/cards')
      .send(body)
  )

  beforeEach(fixtures.cards.populate)
  requiresAuthentication(req)

  describe('with valid data', () => {
    let card, res
    beforeEach(async () => {
      card = fixtures.fakeCard()
      res = await req({ card }).expect(200)
    })

    it('stores a new credit card', async () => {
      const cardDoc = pojo(await CreditCard.findById(res.body.card._id))
      expect(cardDoc).toMatchObject({
        ...card,
        _owner: authenticated.user._id,
      })
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

  describe('with invalid data', () => {
    afterEach('does not store a new credit card', async () => {
      const cards = await CreditCard.find({})
      expect(cards).toHaveLength(fixtures.cards.length)
    })

    it('checks if card number is valid', async () => {
      const invalidNumbers = ['', ' ', '1', 'foo']
      await Promise.all(
        invalidNumbers.map(async number => {
          const card = { ...fixtures.fakeCard(), number }
          const res = await req({ card }).expect(400)
          expect(res.body).toEqual({ errors: { number: any(String) } })
        })
      )
    })

    it('checks if expiry date is valid', async () => {
      const invalidDates = ['', ' ', '1', 'foo', '00/99', '13/99']
      await Promise.all(
        invalidDates.map(async expiry => {
          const card = { ...fixtures.fakeCard(), expiry }
          const res = await req({ card }).expect(400)
          expect(res.body).toEqual({ errors: { expiry: any(String) } })
        })
      )
    })

    it('checks if holder name is present', async () => {
      const card = { ...fixtures.fakeCard(), holder: ' ' }
      const res = await req({ card }).expect(400)
      expect(res.body).toEqual({ errors: { holder: any(String) } })
    })
  })
})

describe('GET /cards', () => {
  const req = authenticated(() => request(app).get('/cards'))

  beforeEach(fixtures.cards.populate)
  requiresAuthentication(req)

  it("returns the user's credit cards", async () => {
    const res = await req().expect(200)
    expect(res.body).toEqual({
      cards: fixtures
        .cardsOf(authenticated.user)
        .map(data => new CreditCard(data).toJSON()),
    })
  })
})

describe('DELETE /cards/:id', () => {
  const req = authenticated(id => request(app).delete(`/cards/${id}`))

  beforeEach(fixtures.cards.populate)
  requiresAuthentication(() => req(newId()))
  validatesId(req)

  it('removes the credit card with the given id', async () => {
    const [card] = fixtures.cardsOf(authenticated.user)
    await req(card._id).expect(200, 'OK')

    const cardDocs = await CreditCard.find({})
    expect(cardDocs).toHaveLength(fixtures.cards.length - 1)
    expect(cardDocs).not.toContain(objectContaining({ _id: card._id }))
  })

  it("does not remove other users' cards", async () => {
    const card = fixtures.cardNotOf(authenticated.user)
    await req(card._id).expect(404, 'Not Found')

    const cardDocs = await CreditCard.find({})
    expect(cardDocs).toHaveLength(fixtures.cards.length)
  })
})
