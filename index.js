//console.log('hello world')

const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const server = http.createServer(app)



//const server = http.createServer((request, response) => {
//  response.writeHead(200, { 'Content-Type': 'text/plain' })
//  response.end('Hello World')
//})

//server.listen(3003, () => {
//  console.log('Server running on port 3003')
//})

const blogSchema = mongoose.Schema({
  author: String,
  title: String,
  url: String,
  votes: Number
})

const Blog = mongoose.model('blogs', blogSchema)
//MONGODB_URI=mongodb+srv://meridata:Salsa100@cluster0.cuzh1.mongodb.net/app_persons?retryWrites=true&w=majority
const mongoUrl = "mongodb+srv://meridata:Salsa100@cluster0.cuzh1.mongodb.net/app_persons?retryWrites=true&w=majority"
//const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  console.log('blog is:',blog)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`)
})