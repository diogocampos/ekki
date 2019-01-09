import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import auth, * as authActions from './auth'

export const actions = {
  ...authActions,
}

const reducer = combineReducers({
  auth,
})

export function provide(component) {
  const store = createStore(reducer, {}, applyMiddleware(thunk))
  return <Provider store={store}>{component}</Provider>
}
