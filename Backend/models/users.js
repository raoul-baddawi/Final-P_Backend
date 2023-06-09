const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please add a password']
    },
    role: {
      type: String,
      enum: ['superAdmin', 'admin', 'user'],
      default: 'user'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema)