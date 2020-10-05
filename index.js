const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})



//console.log('hello world')
/* const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
onst notesRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const Blog = require('./models/blog')
const server = http.createServer(app)
 */


//const server = http.createServer((request, response) => {
//  response.writeHead(200, { 'Content-Type': 'text/plain' })
//  response.end('Hello World')
//})

//server.listen(3003, () => {
//  console.log('Server running on port 3003')
//})



//const Blog = mongoose.model('blogs', blogSchema)

//const mongoUrl = 'mongodb://localhost/bloglist'
/* mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
 */
/* app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  logger.info('blog is:',blog)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
}) */




//const PORT = 3003
/* app.listen(config.PORT, () => {
  logger.info(`App listening at port ${config.PORT}`)
}) */