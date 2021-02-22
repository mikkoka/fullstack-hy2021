const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const app = require('../app')

const api = supertest(app)



describe('GET /api/blogs', () => {
  
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')
  
    

    expect(response.body).toHaveLength(3)
  })

  test('the field id is named correctly', async () => {
    const response = await api.get('/api/blogs')
    

    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST /api/blogs', () => {
  
  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('New blog is added', async () => {

    const newBlog =   {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(1)
    expect(titles).toContain('Canonical string reduction')

  })

  test('If likes not defined in request, zero added', async () => {
    const newBlog =   {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body[0].likes).toBe(0)

  })

  test('If title missing, returns code 400', async () => {
    const newBlog =   {
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  })

  test('If url missing, returns code 400', async () => {
    const newBlog =   {
      title: "TDD harms architecture",
      author: "Robert C. Martin"
      }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  })
})

describe('DELETE /api/blogs', () => {
  
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('succeeds with status code 204 if id is valid', async () => {
    
    const response = await api.get('/api/blogs')
    const blogToDelete = response.body[0].id
        
    await api
      .delete(`/api/blogs/${blogToDelete}`)
      .expect(204)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
