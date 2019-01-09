const URL = 'http://localhost:3001'

const TOKEN = 'token'
const auth = { token: localStorage.getItem(TOKEN) }

function setToken(token) {
  auth.token = token
  localStorage.setItem(TOKEN, token || '')
}

export function hasToken() {
  return !!auth.token
}

async function ekki(method, path, body) {
  const options = {
    method,
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  }
  if (auth.token) options.headers['X-Auth'] = auth.token
  if (body) options.body = JSON.stringify(body)

  const response = await fetch(URL + path, options)
  if (response.status === 401) setToken(null) // Unauthorized

  try {
    var result = await response.json()
  } catch {
    result = {}
  }
  if (!response.ok) throw new ApiError(result, response.status)

  const token = response.headers.get('X-Auth')
  if (token) setToken(token)

  return result
}

export class ApiError {
  constructor(body, status) {
    this.errors = body.errors
    this.status = status
  }
}

// /users methods

export const signUp = ({ username, password, confirm }) => {
  validateUsersRequest(username, password, confirm)
  return ekki('POST', '/users', { user: { username, password } })
}

export const logIn = ({ username, password }) => {
  validateUsersRequest(username, password, password)
  return ekki('POST', '/users/login', { user: { username, password } })
}

export const getUser = () => ekki('GET', '/users/me')

export const logOut = () => ekki('DELETE', '/users/me/token')

function validateUsersRequest(username, password, confirm) {
  if (!username) {
    throw new ApiError({ username: 'Username is required' })
  }
  if (!password) {
    throw new ApiError({ password: 'Password is required' })
  }
  if (!confirm) {
    throw new ApiError({ confirm: 'Password confirmation is required' })
  }
  if (password !== confirm) {
    throw new ApiError({ confirm: "Passwords don't match" })
  }
}
