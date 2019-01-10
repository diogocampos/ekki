import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'

import Form, { Field } from './Form'
import { Button, Spinner, Title } from './utils'
import { actions } from '../state'

class Contacts extends React.Component {
  componentDidMount() {
    this.props.getContacts()
  }

  handleAddContact = formData => {
    this.props.onAddContact(formData)
  }

  handleToggleFavorite = contact => {
    this.props.onToggleFavoriteContact(contact)
  }

  handleDeleteContact = id => {
    this.props.onDeleteContact(id)
  }

  render() {
    const { contacts } = this.props
    return (
      <div className="container ekki-container">
        {contacts.isFetching ? (
          <Spinner />
        ) : (
          <>
            <ContactList
              title="Favorites"
              items={getFavorites(contacts.items)}
              onToggleFavorite={this.handleToggleFavorite}
              onDelete={this.handleDeleteContact}
            />
            <ContactList
              items={getNonFavorites(contacts.items)}
              onToggleFavorite={this.handleToggleFavorite}
              onDelete={this.handleDeleteContact}
            />
          </>
        )}

        <Title>Add a contact</Title>
        <ContactForm
          errors={contacts.errors}
          onSubmit={this.handleAddContact}
        />
      </div>
    )
  }
}

function ContactList(props) {
  const { title = 'Contacts', items, ...itemProps } = props
  if (items.length === 0) return null
  return (
    <>
      <Title>{title}</Title>
      {items.map(contact => (
        <Contact {...itemProps} key={contact._id} contact={contact} />
      ))}
    </>
  )
}

function Contact(props) {
  const { contact, onToggleFavorite, onDelete } = props
  return (
    <article className="box media">
      <figure className="media-left">
        <p className="image is-32x32">
          <img
            className="is-rounded"
            src={avatarUrl(contact.username)}
            alt=""
          />
        </p>
      </figure>

      <div className="media-content">
        <p>
          {contact.username}{' '}
          <FavoriteButton
            favorite={contact.favorite}
            onClick={() => onToggleFavorite(contact)}
          />
        </p>
      </div>

      <div className="media-right">
        <button className="delete" onClick={() => onDelete(contact._id)} />
      </div>
    </article>
  )
}

function FavoriteButton(props) {
  const { favorite, onClick } = props
  return (
    <span
      className={classNames(
        'ekki-clickable is-size-5',
        favorite ? 'has-text-warning' : 'has-text-grey-lighter'
      )}
      onClick={onClick}
    >
      ★
    </span>
  )
}

function ContactForm(props) {
  const { errors, onSubmit } = props
  return (
    <Form onSubmit={onSubmit}>
      <Field
        name="username"
        placeholder="Username"
        errorMessage={errors && errors.username}
      />
      <Button type="submit">Add</Button>
    </Form>
  )
}

const mapStateToProps = state => ({
  contacts: state.contacts,
})

const mapDispatchToProps = {
  getContacts: actions.getContacts,
  onAddContact: actions.addContact,
  onToggleFavoriteContact: actions.toggleFavoriteContact,
  onDeleteContact: actions.deleteContact,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts)

// Helpers

const getFavorites = items =>
  sortContacts(items.filter(contact => contact.favorite))

const getNonFavorites = items =>
  sortContacts(items.filter(contact => !contact.favorite))

const sortContacts = items =>
  items.sort((a, b) => a.username.localeCompare(b.username))

const avatarUrl = (username, size = 64) =>
  `https://api.adorable.io/avatars/${size}/${username}.png`
