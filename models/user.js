const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Blog = require('./blog')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: [3, 'Liian lyhyt tunnus, tunnus 3 kirjainta'],
    required: true,
    unique: true
  },
  name: String,
  
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      minlength: [3, 'Liian lyhyt salasana, minimi 3 merkkiä'],
      required: true,
      ref: 'Blog'   //tämä on viite toiseen tauluun
    }
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User