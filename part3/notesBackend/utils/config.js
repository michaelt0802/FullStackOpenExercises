require('dotenv').config()

const PORT = process.env.PORT
const MONGOD_URI = process.env.MONGOD_URI

module.exports = {
  MONGOD_URI,
  PORT
}