const request = require('supertest')

const app = require('../app')

describe('GET /unknown', () => {
  const req = () => request(app).get('/unknown')

  it('responds with 404', async () => {
    await req().expect(404, 'Not Found')
  })
})

describe('GET /error/:type', () => {
  const req = type => request(app).get(`/error/${type}`)

  for (const type of ['next', 'throw', 'reject']) {
    it(`'${type}' responds with 500`, async () => {
      await req(type).expect(500, 'Internal Server Error')
    })
  }
})
