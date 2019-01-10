import * as Ekki from '../lib/Ekki'

// Action creators

export const signUp = call(Ekki.signUp)
export const logIn = call(Ekki.logIn)
export const getUser = call(Ekki.getUser, { if: Ekki.hasToken })
export const logOut = call(Ekki.logOut)

function call(apiMethod, { if: condition } = {}) {
  return formData => async dispatch => {
    if (condition && !condition()) return
    dispatch(authRequest())
    try {
      const { user } = await apiMethod(formData)
      dispatch(authSuccess(user))
    } catch (err) {
      dispatch(authFailure(err.errors))
    }
  }
}

const AUTH_REQUEST = 'auth/request'
const AUTH_SUCCESS = 'auth/success'
const AUTH_FAILURE = 'auth/failure'

const authRequest = () => ({ type: AUTH_REQUEST })
const authSuccess = user => ({ type: AUTH_SUCCESS, user })
const authFailure = errors => ({ type: AUTH_FAILURE, errors })

// Reducer

const defaultState = {
  isFetching: Ekki.hasToken(),
  user: null,
  errors: null, // error messages for the login/signup form
}

export default function auth(state = defaultState, action) {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        isFetching: true,
        errors: null,
      }

    case AUTH_SUCCESS:
      return {
        isFetching: false,
        user: action.user,
        errors: null,
      }

    case AUTH_FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.errors,
      }

    default:
      return state
  }
}
