const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('when a user is created on database,', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const newUser = {
      username: 'te',
      password: 'pass'
    }

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('an invalid username (minlength of 3) is not added to the database', async () => {
    usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'te',
      password: 'pass'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtStart).toHaveLength(usersAtEnd.length)
  })
})

test('an undefined password is invalid and returns 400', async () => {
  usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'tehh',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtStart).toHaveLength(usersAtEnd.length)
})

test('an empty password is invalid and returns 400', async () => {
  usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'tehh',
    password: ''
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtStart).toHaveLength(usersAtEnd.length)
})


afterAll(async () => {
  await mongoose.connection.close()
})