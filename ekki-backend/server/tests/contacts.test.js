const expect = require('expect')
const request = require('supertest')

const fixtures = require('./fixtures')
const { OBJECT_ID, pojo, requiresAuthentication } = require('./helpers')
const app = require('../app')
const Contact = require('../db/Contact')

const { stringMatching } = expect
const { authenticated } = fixtures

beforeEach(fixtures.contacts.populate)

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

  describe('with invalid data', () => {
    afterEach('does not create a new contact', async () => {
      const contactDocs = await Contact.find({})
      expect(contactDocs).toHaveLength(fixtures.contacts.length)
    })

    it('responds with 404 if the username does not exist', async () => {
      const contact = { username: fixtures.fakeUsername() }
      await req({ contact }).expect(404, 'Not Found')
    })

    it('responds with 400 if the contact already exists', async () => {
      const [{ username }] = fixtures.contactsOf(authenticated.user)
      await req({ contact: { username } }).expect(400, 'Bad Request')
    })
  })
})
