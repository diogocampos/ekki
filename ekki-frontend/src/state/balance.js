import * as Ekki from '../lib/Ekki'

// Action creators

export const getBalance = () => async dispatch => {
  dispatch(balanceRequest())
  try {
    const { balance } = await Ekki.getBalance()
    dispatch(balanceSuccess(balance))
  } catch {
    dispatch(balanceFailure())
  }
}

const BALANCE_REQUEST = 'balance/request'
const BALANCE_SUCCESS = 'balance/success'
const BALANCE_FAILURE = 'balance/failure'

const balanceRequest = () => ({ type: BALANCE_REQUEST })
const balanceSuccess = balance => ({ type: BALANCE_SUCCESS, balance })
const balanceFailure = () => ({ type: BALANCE_FAILURE })

// Reducer

const defaultState = {
  isFetching: false,
  value: null,
}

export default function balance(state = defaultState, action) {
  switch (action.type) {
    case BALANCE_REQUEST:
      return { ...state, isFetching: true }

    case BALANCE_SUCCESS:
      return { isFetching: false, value: action.balance }

    case BALANCE_FAILURE:
      return { ...state, isFetching: false }

    default:
      return state
  }
}
