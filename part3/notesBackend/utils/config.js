require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGOD_URI

module.exports = {
  MONGODB_URI,
  PORT
}