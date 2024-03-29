const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  console.log('adding new user')

  if (password === undefined || password === '') {
    return response.status(400).json({ error: 'password missing' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  const savedUser = await user.save()

  console.log('savedUser', savedUser)

  response.status(201).json(savedUser)
  console.log('done adding user')
})

module.exports = usersRouter
