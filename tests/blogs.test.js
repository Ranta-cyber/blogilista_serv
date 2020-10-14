const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

/* const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Blogi2',
    author: 'Rebeca',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 4,
    __v: 0
  }
] */

describe.only('all blogs are returned', () => {
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(3)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blog contain id', async () => {
    await api
      .get('/api/blogs')
      .expect('id').toBeDefined()
  })

  test('notes are returned as json', async () => {
    await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    })

  test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(helper.initialNotes.length)
})

  test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)
  expect(contents).toContain(
    'Petrin blogi'
  )
    expect(response2.body).toHaveLength(initialCount + 1)
  })

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('total likes', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe()
  })
})

describe('favorite likes', () => {
  test('favorite likes', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)

    var indexOf = listWithOneBlog.findIndex(i => i.likes === result)

    console.log('author:', listWithOneBlog[indexOf].author)
    console.log('title:', listWithOneBlog[indexOf].title)
    console.log('likes:', listWithOneBlog[indexOf].likes)

    expect(result).toBe(5)
  })
})

afterAll(() => {
  mongoose.connection.close()
})