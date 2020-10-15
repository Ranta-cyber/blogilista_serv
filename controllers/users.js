const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {

  const users = await User
    .find({}).populate('blogs', { author: 1, title: 1 })

  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.passwordHash, saltRounds)
  
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  const savedUser = await user.save()

  response.status(200).json(savedUser)
})

module.exports = usersRouter