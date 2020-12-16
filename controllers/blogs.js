
const jwt = require('jsonwebtoken')
const blog = require('../models/blog')

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  console.log('POST:SSA')
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  //console.log('body:',request.body)
  console.log('token:', request.token)
  if (blog.votes === null) {
    blog.votes = 0
  }
  if (blog.title === null && blog.url === null) {
    response.status(400).end()
    return
  }
  //const token = getTokenFrom(request)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  blog.user = user._id

  //console.log('blog.user:',blog)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  const blogi = {
    user: user._id,
    author: body.author,
    title: body.title,
    url: body.url,
    votes: body.votes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogi, { new: true })
  response.json(updatedBlog.toJSON())
})

// commenttien päivitys
blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body.comments
  const blog = await Blog.findById(request.params.id)

  if (request.body.comment === null) {
    response.status(400).end()
    return
  }

  blog.comments = [...blog.comments, comment]
  const savedBlog = await blog.save()

  response.json(savedBlog.toJSON())
})

module.exports = blogsRouter