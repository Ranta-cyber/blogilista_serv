const listHelper = require('../utils/list_helper')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

test('blog can be added', async () => {
  const initialNotes = await listHelper.notesInDb()

  const response = await api.post('/api/blogs')
    .send({
      'author': 'Petri',
      'title': 'Petrin blogi',
      'url': 'Petrin urli',
      'votes': 6
    })
    expect(response.statusCode).toBe(201)
     // expect('Content-Type', /application\/json/)
     // .end(response)

     const notesAtEnd = await listHelper.notesInDb()

     expect(notesAtEnd).toHaveLength(
       initialNotes.length + 1
     )
    

})

test('blog have 0 votes if is null', async () => {

  const response = await api.post('/api/blogs')
    .send({
      'author': 'Petri',
      'title': 'Petrin blogi',
      'url': 'Petrin urli',
      'votes': null
    })
    expect(response.statusCode).toBe(201)
     
})

test.only('blog response 400 if not author and url', async () => {

  const response = await api.post('/api/blogs')
    .send({
      'author': 'Anna',
      'title': null,
      'url': null,
      'votes': 7
    })
    expect(response.statusCode).toBe(400)
     
})

afterAll(() => {
  mongoose.connection.close()
})
