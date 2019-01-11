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
  const options = { method, mode: 'cors', headers: {} }
  if (auth.token) options.headers['X-Auth'] = auth.token
  if (body) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(body)
  }

  const response = await fetch(URL + path, options)
  if (response.status === 401) setToken(null) // Unauthorized

  try {
    var result = await response.json()
  } catch {
    result = {}
  }
  if (!response.ok) throw new ApiError(result.errors, response.status)

  const token = response.headers.get('X-Auth')
  if (token) setToken(token)

  return result
}

export class ApiError {
  constructor(errors, status) {
    this.errors = errors
    this.status = status
  }
}

// /balance

export const getBalance = () => ekki('GET', '/balance')

// /cards

export const addCard = ({ number, expiry, holder }) => {
  validateCardData(number, expiry, holder)
  return ekki('POST', '/cards', { card: { number, expiry, holder } })
}

export const getCards = () => ekki('GET', '/cards')

export const deleteCard = id => ekki('DELETE', `/cards/${id}`)

// /contacts

export const addContact = ({ username }) => {
  validateContactData(username)
  return ekki('POST', '/contacts', { contact: { username } })
}

export const getContacts = () => ekki('GET', '/contacts')

export const updateContact = (id, { favorite }) =>
  ekki('PATCH', `/contacts/${id}`, { patch: { favorite: !!favorite } })

export const deleteContact = id => ekki('DELETE', `/contacts/${id}`)

// /transfers

export const makeTransfer = ({ to, amount, cardId, password }) => {
  amount = (+amount).toFixed(2).replace('.', '') // convert to cents
  validateTransferData(to, amount)
  return ekki('POST', '/transfers', {
    transfer: { to, amount, cardId, password },
  })
}

export const getTransfers = () => ekki('GET', '/transfers')

// /users

export const signUp = ({ username, password, confirm }) => {
  validateUserData(username, password, confirm)
  return ekki('POST', '/users', { user: { username, password } })
}

export const logIn = ({ username, password }) => {
  validateUserData(username, password, password)
  return ekki('POST', '/users/login', { user: { username, password } })
}

export const getUser = () => ekki('GET', '/users/me')

export const logOut = () => ekki('DELETE', '/users/me/token')

// Validation

function validateCardData(number, expiry, holder) {
  requires(number, 'number', 'Card number')
  requires(expiry, 'expiry', 'Expiration date')
  requires(holder, 'holder', 'Card holder')
}

function validateContactData(username) {
  requires(username, 'username', 'Username')
}

function validateTransferData(to, amount) {
  requires(to, 'to', "Receiver's username")
  // requires(amount, 'amount', 'Amount')

  if (amount === 'NaN') {
    throw new ApiError({ amount: 'Amount must be a valid number' })
  }
}

function validateUserData(username, password, confirm) {
  requires(username, 'username', 'Username')
  requires(password, 'password', 'Password')
  requires(confirm, 'confirm', 'Password confirmation')

  if (password !== confirm) {
    throw new ApiError({ confirm: "Passwords don't match" })
  }
}

function requires(value, fieldName, fieldLabel) {
  if (!value) {
    throw new ApiError({ [fieldName]: `${fieldLabel} is required` })
  }
}
