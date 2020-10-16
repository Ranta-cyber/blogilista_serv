const bcrypt = require('bcrypt')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

describe('when there is initially one user at db', () => {
  /* beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    //tallentaa suoraan tietokantaan
    const user = new User({ username: 'root', name: 'Petri Jaakkola', passwordHash })

    await user.save()
  }) */

  test.only('creation succeeds with a fresh username', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser =  {
      username: 'Anu',
      name: 'Anu Laitila',
      passwordHash: 'Anu',
    }

    const response = await api.post('/api/users')
      .send(newUser)
    expect(response.statusCode).toBe(200)
    //expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

test('creation fails with proper statuscode and message if username already taken', async () => {
  const usersAtStart = await listHelper.usersInDb()

  const newUser = {
    username: 'root',
    name: 'Superuser',
    passwordHash: 'salainen',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('`username` to be unique')

  const usersAtEnd = await listHelper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})


afterAll(() => {
  mongoose.connection.close()
})