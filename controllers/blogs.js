
const jwt = require('jsonwebtoken')

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})



blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  //console.log('body:',request.body)
  console.log('token:',request.token)
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

  //const user = await User.findById(request.body.userId)
  //console.log('user:', user)
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

blogsRouter.put('/api/blogs/:id', async (request, response, next) => {
  const body = request.body

  

  const blogi = {
    author: body.author,
    title: body.title,
    url: body.url,
    votes: body.votes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogi, { new: true })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter