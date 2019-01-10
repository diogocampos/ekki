import * as Ekki from '../lib/Ekki'

// Action creators

const wrap = fn => async dispatch => {
  dispatch(transfersRequest())
  try {
    await fn(dispatch)
    dispatch(transfersSuccess())
  } catch (err) {
    dispatch(transfersFailure(err.errors))
  }
}

export const getTransfers = () =>
  wrap(async dispatch => {
    const { transfers } = await Ekki.getTransfers()
    dispatch(setTransfers(transfers))
  })

export const makeTransfer = data =>
  wrap(async dispatch => {
    const { transfer } = await Ekki.makeTransfer(data)
    dispatch(transferAdded(transfer))
  })

const TRANSFERS_REQUEST = 'transfers/request'
const TRANSFERS_SUCCESS = 'transfers/success'
const TRANSFERS_FAILURE = 'transfers/failure'

const SET_TRANSFERS = 'transfers/set-transfers'
const TRANSFER_ADDED = 'transfers/transfer-added'

const transfersRequest = () => ({ type: TRANSFERS_REQUEST })
const transfersSuccess = () => ({ type: TRANSFERS_SUCCESS })
const transfersFailure = errors => ({ type: TRANSFERS_FAILURE, errors })

const setTransfers = transfers => ({ type: SET_TRANSFERS, transfers })
const transferAdded = transfer => ({ type: TRANSFER_ADDED, transfer })

// Reducer

const defaultState = {
  isFetching: false,
  items: [],
  errors: null,
}

export default function transfers(state = defaultState, action) {
  switch (action.type) {
    case TRANSFERS_REQUEST:
      return { ...state, isFetching: true, errors: null }

    case TRANSFERS_SUCCESS:
      return { ...state, isFetching: false, errors: null }

    case TRANSFERS_FAILURE:
      return { ...state, isFetching: false, errors: action.errors }

    case SET_TRANSFERS:
      return { ...state, items: action.transfers }

    case TRANSFER_ADDED:
      return { ...state, items: [action.transfer, ...state.items] }

    default:
      return state
  }
}
