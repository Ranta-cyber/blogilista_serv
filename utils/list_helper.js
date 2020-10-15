const Blog = require('../models/blog')
const User = require('../models/user')


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const dummy = (blogs) => {
  return 1
}

const totalLikes = array => {
  const reducer = (sum, array) => {
    return sum + array.likes
  }
  return array.length === 0
    ? 0
    : array.reduce(reducer,0) // total likes
}

const favoriteBlog = array => {
  const reducer = (maksim, array) => {
    return Math.max(maksim, array.likes)
  }
  return array.length === 0
    ? 0 
    : array.reduce(reducer,0) // eniten likes
}
 
const nonExistingId = async () => {
  const note = new Blog({ content: 'willremovethissoon', date: new Date() })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  nonExistingId,
  notesInDb,
  usersInDb
}