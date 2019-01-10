import * as Ekki from '../lib/Ekki'

// Action creators

const wrap = fn => async dispatch => {
  dispatch(contactsRequest())
  try {
    await fn(dispatch)
    dispatch(contactsSuccess())
  } catch (err) {
    dispatch(contactsFailure(err.errors))
  }
}

export const getContacts = () =>
  wrap(async dispatch => {
    const { contacts } = await Ekki.getContacts()
    dispatch(setContacts(contacts))
  })

export const addContact = data =>
  wrap(async dispatch => {
    const { contact } = await Ekki.addContact(data)
    dispatch(contactAdded(contact))
  })

export const updateContact = (id, data) =>
  wrap(async dispatch => {
    const { contact } = await Ekki.updateContact(data)
    dispatch(contactUpdated(id, contact))
  })

export const deleteContact = id =>
  wrap(async dispatch => {
    await Ekki.deleteContact(id)
    dispatch(contactDeleted(id))
  })

const CONTACTS_REQUEST = 'contacts/request'
const CONTACTS_SUCCESS = 'contacts/success'
const CONTACTS_FAILURE = 'contacts/failure'

const SET_CONTACTS = 'contacts/set-contacts'
const CONTACT_ADDED = 'contacts/contact-added'
const CONTACT_UPDATED = 'contacts/contact-updated'
const CONTACT_DELETED = 'contacts/contact-deleted'

const contactsRequest = () => ({ type: CONTACTS_REQUEST })
const contactsSuccess = () => ({ type: CONTACTS_SUCCESS })
const contactsFailure = errors => ({ type: CONTACTS_FAILURE, errors })

const setContacts = contacts => ({ type: SET_CONTACTS, contacts })
const contactAdded = contact => ({ type: CONTACT_ADDED, contact })
const contactUpdated = (id, contact) => ({ type: CONTACT_UPDATED, id, contact })
const contactDeleted = id => ({ type: CONTACT_DELETED, id })

// Reducer

const defaultState = {
  isFetching: false,
  items: [],
  errors: null, // error messages for the 'Add Contact' form
}

export default function contacts(state = defaultState, action) {
  switch (action.type) {
    case CONTACTS_REQUEST:
      return { ...state, isFetching: true, errors: null }

    case CONTACTS_SUCCESS:
      return { ...state, isFetching: false, errors: null }

    case CONTACTS_FAILURE:
      return { ...state, isFetching: false, errors: action.errors }

    case SET_CONTACTS:
      return { ...state, items: action.contacts }

    case CONTACT_ADDED:
      return { ...state, items: [...state.items, action.contact] }

    case CONTACT_UPDATED:
      return {
        ...state,
        items: state.items.map(contact =>
          contact._id === action.id ? action.contact : contact
        ),
      }

    case CONTACT_DELETED:
      return {
        ...state,
        items: state.items.filter(contact => contact._id !== action.id),
      }

    default:
      return state
  }
}
