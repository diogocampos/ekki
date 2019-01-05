const expect = require('expect')
const request = require('supertest')

const fixtures = require('./fixtures')
const { OBJECT_ID, pojo, requiresAuthentication } = require('./helpers')
const app = require('../app')
const Contact = require('../db/Contact')

const { stringMatching } = expect
const { authenticated } = fixtures

describe('POST /contacts', () => {
  const req = authenticated(body =>
    request(app)
      .post('/contacts')
      .send(body)
  )

  requiresAuthentication(req)

  describe('with valid data', () => {
    let contact, res
    beforeEach(async () => {
      contact = fixtures.newContactFor(authenticated.user)
      res = await req({ contact }).expect(200)
    })

    it('creates and returns a new contact', async () => {
      const contactDoc = pojo(await Contact.findById(res.body.contact._id))
      expect(contactDoc).toMatchObject({
        _owner: authenticated.user._id,
        username: contact.username,
        favorite: false,
      })
    })

    it('includes contact info in response body', () => {
      expect(res.body).toEqual({
        contact: {
          _id: stringMatching(OBJECT_ID),
          username: contact.username,
          favorite: false,
        },
      })
    })
  })
})
