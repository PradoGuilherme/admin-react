const api = require('../Services/api')

const USER_TOKEN_KEY = 'USER_TOKEN_KEY'

export const isAuthenticated = () => {
  return localStorage.getItem(USER_TOKEN_KEY) !== null
}

export const sessionLogin = async (email, senha) => {
  const result = await api.post('/login', { email, senha })
  if (result && result.data && result.data.error) return result.data
  if (result.data && result.data.data && result.data.data.token) {
    localStorage.setItem(USER_TOKEN_KEY, result.data.data.token)
  }
}

export const sessionLogout = () => {
  localStorage.removeItem(USER_TOKEN_KEY)
}
