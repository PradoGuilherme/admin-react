const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 30000,
  headers: { 'X-Custom-Header': 'foobar' }
})

instance.interceptors.request.use(async config => {
  const userToken = localStorage.getItem('USER_TOKEN_KEY')
  if (userToken) { config.headers['x-access-token'] = userToken }
  return config
})

module.exports = instance
