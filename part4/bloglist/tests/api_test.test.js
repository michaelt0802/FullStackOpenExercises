const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

let token = ''
beforeAll(async () => {
  await User.deleteMany({})

  user = await api
    .post('/api/users')
    .send({
      username: 'tester',
      password: 'test',
    })
    .expect(201)

  tokenRequest = await api
    .post('/api/login')
    .send({
      username: 'tester',
      password: 'test',
    })
    .expect(200)

  token = tokenRequest._body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
describe('get requests', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('each blog document has an id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach((item) => expect(item._id).toBeDefined())
  })
})

describe('post request', () => {
  test('new blogs can be posted', async () => {
    const newBlog = {
      title: 'very new stuff',
      author: 'Guy Man',
      url: 'guy.man',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'Bearer ' + token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('new blog missing likes defaults to 0 likes', async () => {
    const newBlog = {
      title: 'no likes no problem',
      author: 'Guy Man',
      url: 'guy.man',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'Bearer ' + token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('new blog missing either title or url have status 400', async () => {
    const newBlogNoURL = {
      title: 'no likes no problem',
      author: 'Guy Man',
    }

    const newBlogNoTitle = {
      author: 'Guy Man',
      url: 'guy.man',
    }

    await api
      .post('/api/blogs')
      .send(newBlogNoURL)
      .set('Authorization', 'Bearer ' + token)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(newBlogNoTitle)
      .set('Authorization', 'Bearer ' + token)
      .expect(400)
  })

  test('new blog without token has status 401', async () => {
    const newBlog = {
      title: 'very new stuff',
      author: 'Guy Man',
      url: 'guy.man',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('delete requests', () => {
  test('delete a single blog', async () => {
    let blog = helper.initialBlogs[0]

    const blogs = await helper.blogsInDb()
    console.log('blogs', blogs)

    await api
      .delete(`/api/blogs/${blog._id}`)
      .set('Authorization', 'Bearer ' + token)
      // .expect(response => {console.log(response.error)})
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
  })
})

describe('put requests', () => {
  test('update single blog', async () => {
    const newBlog = {
      title: 'I am an improvement',
      author: 'Better Man',
      url: 'better.blog',
      likes: '1000',
    }

    const blogs = await helper.blogsInDb()
    const blog = blogs[0]

    await api
      .put(`/api/blogs/${blog._id}`, newBlog)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
