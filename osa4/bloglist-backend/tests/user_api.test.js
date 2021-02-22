const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')

const app = require('../app')

const api = supertest(app)

describe('POST /api/users', () => {
  
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('New user is added', async () => {

    const newUser =   {
      "name": "Mikko Mahtava",        
      "username": "Miksi",
      "password": "salainen"
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Mikko Mahtava')

  })

  test('If username short (3), returns code 400', async () => {
    const newUser =   {
      "name": "Mikko Mahtava",        
      "username": "Mik",
      "password": "salainen"
  }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  })  
  
  test('If password is short (3), returns code 400', async () => {
    const newUser =   {
      "name": "Mikko Mahtava",        
      "username": "Mikko",
      "password": "sal"
  }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
