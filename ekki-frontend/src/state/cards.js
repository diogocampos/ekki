import * as Ekki from '../lib/Ekki'

// Action creators

const wrap = fn => async dispatch => {
  dispatch(cardsRequest())
  try {
    await fn(dispatch)
    dispatch(cardsSuccess())
  } catch (err) {
    dispatch(cardsFailure(err.errors))
  }
}

export const getCards = () =>
  wrap(async dispatch => {
    const { cards } = await Ekki.getCards()
    dispatch(setCards(cards))
  })

export const addCard = data =>
  wrap(async dispatch => {
    const { card } = await Ekki.addCard(data)
    dispatch(cardAdded(card))
  })

export const deleteCard = id =>
  wrap(async dispatch => {
    await Ekki.deleteCard(id)
    dispatch(cardDeleted(id))
  })

const CARDS_REQUEST = 'cards/request'
const CARDS_SUCCESS = 'cards/success'
const CARDS_FAILURE = 'cards/failure'

const SET_CARDS = 'cards/set-cards'
const CARD_ADDED = 'cards/card-added'
const CARD_DELETED = 'cards/card-deleted'

const cardsRequest = () => ({ type: CARDS_REQUEST })
const cardsSuccess = () => ({ type: CARDS_SUCCESS })
const cardsFailure = errors => ({ type: CARDS_FAILURE, errors })

const setCards = cards => ({ type: SET_CARDS, cards })
const cardAdded = card => ({ type: CARD_ADDED, card })
const cardDeleted = id => ({ type: CARD_DELETED, id })

// Reducer

const defaultState = {
  isFetching: false,
  items: [],
  errors: null, // error messages for the 'Add Card' form
}

export default function cards(state = defaultState, action) {
  switch (action.type) {
    case CARDS_REQUEST:
      return { ...state, isFetching: true, errors: null }

    case CARDS_SUCCESS:
      return { ...state, isFetching: false, errors: null }

    case CARDS_FAILURE:
      return { ...state, isFetching: false, errors: action.errors }

    case SET_CARDS:
      return { ...state, items: action.cards }

    case CARD_ADDED:
      return { ...state, items: [...state.items, action.card] }

    case CARD_DELETED:
      return {
        ...state,
        items: state.items.filter(card => card._id !== action.id),
      }

    default:
      return state
  }
}
