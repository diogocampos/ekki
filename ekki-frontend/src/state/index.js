import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import auth, * as authActions from './auth'
import balance, * as balanceActions from './balance'
import cards, * as cardsActions from './cards'

export const actions = {
  ...authActions,
  ...balanceActions,
  ...cardsActions,
}

const reducer = combineReducers({
  auth,
  balance,
  cards,
})

export function provide(component) {
  const store = createStore(reducer, {}, applyMiddleware(thunk))
  return <Provider store={store}>{component}</Provider>
}
