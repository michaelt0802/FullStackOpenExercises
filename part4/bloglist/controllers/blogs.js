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
  console.log('body', body)
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
    category: body.category
  })

  try {
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
  } catch (error) {
    console.error(error.message)
  }

})

blogsRouter.post('/:id/comments', async (request, response) => {
  console.log('request.body', request.body)
  const { content } = request.body
  console.log('content', content)

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

    const savedBlog = await blog.save()

    const commentFromServer = savedBlog.comments.find(comment => comment.content === content)
    console.log('savedBlog', savedBlog)

    return response.status(201).json(commentFromServer)

  } catch (error) {
    console.error(error)
    return response.status(500).json({ error: 'server error' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, category } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, category },
    { new: true, runValidators: true, context: 'query' }
  )

  response.json(updatedBlog)
})

blogsRouter.put('/:id/likeBlog', async (request, response) => {
  const { id } = request.params
  const { userId } = request.body

  console.log('id', id)
  console.log('userId', userId)

    try {
      const blog = await Blog.findById(id)
      console.log('blog', blog)

      const isLiked = blog.likes.includes(userId)

      if (isLiked) {
        blog.likes.pull(userId)
      } else {
        blog.likes.push(userId)
      }



      const blogFromServer = await blog.save()
      console.log('blog after like', blogFromServer)
      return response.status(201).json(blogFromServer)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Server error' })
    }
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
