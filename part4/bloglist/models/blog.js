const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const blogSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: { type: Number, default: 0 },
  comments: [commentSchema]
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
