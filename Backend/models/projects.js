const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    subtitle: {
      type: String,
      required: [true, 'Please add an subtitle'],
    },
    desc: {
      type: String,
      required: [true, 'Please add a description']
    },
    technologies: {
      type: String,
      required: [true, 'Please add Tech used'],
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    website_link: {
      type: String,
    },
    repository: {
      type: String,
      required: [true, 'Please add repo link'],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Project', ProjectSchema)