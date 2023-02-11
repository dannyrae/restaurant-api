const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'Firstname is required']
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'email address is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  user_type: {
    type: String,
    default: "user",
    enum: ["user", "admin"]
  }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel