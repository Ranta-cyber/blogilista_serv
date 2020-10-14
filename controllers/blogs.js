
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  if (blog.votes === null) {
    blog.votes = 0
  }
  if (blog.title === null && blog.url === null) {
    response.status(400).end()
    return
  }
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
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
      response.json(updatedBlog.toJSON()
})

module.exports = blogsRouter