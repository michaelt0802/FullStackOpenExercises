const config = require('./util/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('/controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./util/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGOD_URI)

mongoose.connect(config.MONGOD_URI)
  .then(() => {
    logger.info('connect to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app