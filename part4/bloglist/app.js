const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
// mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB', error.message)
  })

app.use(cors())
// app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
// app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)

module.exports = app
