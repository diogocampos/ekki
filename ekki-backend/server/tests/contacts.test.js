const expect = require('expect')
const request = require('supertest')

const fixtures = require('./fixtures')
const {
  newId,
  OBJECT_ID,
  pojo,
  rejectsEmptyRequestBody,
  requiresAuthentication,
  validatesId,
} = require('./helpers')
const app = require('../app')
const Contact = require('../db/Contact')

const { any, objectContaining, stringMatching } = expect
const { authenticated } = fixtures

describe('POST /contacts', () => {
  const req = authenticated(body =>
    request(app)
      .post('/contacts')
      .send(body)
  )

  beforeEach(fixtures.contacts.populate)
  requiresAuthentication(req)
  rejectsEmptyRequestBody(req)

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
    it('responds with 404 if the username does not exist', async () => {
      const contact = { username: fixtures.fakeUsername() }
      const res = await req({ contact }).expect(404)
      expect(res.body).toEqual({ errors: { username: any(String) } })
    })

    it('responds with 400 if the contact already exists', async () => {
      const [{ username }] = fixtures.contactsOf(authenticated.user)
      const res = await req({ contact: { username } }).expect(400)
      expect(res.body).toEqual({ errors: { username: any(String) } })
    })

    it('responds with 400 if the contact is the same as the user', async () => {
      const contact = { username: authenticated.user.username }
      const res = await req({ contact }).expect(400)
      expect(res.body).toEqual({ errors: { username: any(String) } })
    })

    afterEach('does not create a new contact', async () => {
      const contactDocs = await Contact.find({})
      expect(contactDocs).toHaveLength(fixtures.contacts.length)
    })
  })
})

describe('GET /contacts', () => {
  const req = authenticated(() => request(app).get('/contacts'))

  beforeEach(fixtures.contacts.populate)
  requiresAuthentication(req)

  it("returns the user's contacts", async () => {
    const res = await req().expect(200)
    expect(res.body).toEqual({
      contacts: fixtures
        .contactsOf(authenticated.user)
        .map(data => new Contact(data).toJSON()),
    })
  })
})

describe('PATCH /contacts/:id', () => {
  const req = authenticated((id, body) =>
    request(app)
      .patch(`/contacts/${id}`)
      .send(body)
  )

  beforeEach(fixtures.contacts.populate)
  requiresAuthentication(() => req(newId(), {}))
  validatesId(req)
  rejectsEmptyRequestBody(body => req(newId(), body))

  it('marks or unmarks the contact as a favorite and returns it', async () => {
    const [contact] = fixtures.contactsOf(authenticated.user)
    const patch = { favorite: !contact.favorite }
    const res = await req(contact._id, { patch }).expect(200)

    const contactDoc = pojo(await Contact.findById(contact._id))
    expect(contactDoc).toMatchObject({ ...contact, ...patch })
    expect(res.body).toEqual({
      contact: {
        _id: contact._id,
        username: contact.username,
        favorite: patch.favorite,
      },
    })
  })

  it("does not update other users' contacts", async () => {
    const contact = fixtures.contactNotOf(authenticated.user)
    const patch = { favorite: !contact.favorite }
    await req(contact._id, { patch }).expect(404, 'Not Found')

    const contactDoc = pojo(await Contact.findById(contact._id))
    expect(contactDoc).toMatchObject(contact)
  })
})

describe('DELETE /contacts/:id', () => {
  const req = authenticated(id => request(app).delete(`/contacts/${id}`))

  beforeEach(fixtures.contacts.populate)
  requiresAuthentication(() => req(newId()))
  validatesId(req)

  it('removes the contact with the given id and returns the id', async () => {
    const [contact] = fixtures.contactsOf(authenticated.user)
    await req(contact._id).expect(200)

    const contactDocs = await Contact.find({})
    expect(contactDocs).toHaveLength(fixtures.contacts.length - 1)
    expect(contactDocs).not.toContain(objectContaining({ _id: contact._id }))
  })

  it("does not remove other users' contacts", async () => {
    const contact = fixtures.contactNotOf(authenticated.user)
    await req(contact._id).expect(404)

    const contactDocs = await Contact.find({})
    expect(contactDocs).toHaveLength(fixtures.contacts.length)
  })
})
