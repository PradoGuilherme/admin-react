const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 30000,
  headers: { 'X-Custom-Header': 'foobar' }
})

module.exports = instance
