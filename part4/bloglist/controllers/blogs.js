const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const app = require('../app')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: 'missing url or title' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { content } = request.body

  if (content.length === 0) {
    return response.status(400).json({ error: 'missing comment content' })
  }

  try {
    const blog = await Blog.findById(request.params.id)

    const newComment = {
      content,
      createdAt: new Date()
    }

    blog.comments.push(newComment)

    await blog.save()

    return response.status(201).json(newComment)

  } catch (error) {
    console.error(error)
    return response.status(500).json({ error: 'server error' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )

  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogPost = await Blog.findById(request.params.id)

  if (blogPost.user.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'wrong user' })
  }

  await Blog.deleteOne(blogPost._id)

  response.status(204).end()
})

module.exports = blogsRouter
