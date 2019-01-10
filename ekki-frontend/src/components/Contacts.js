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
            />
            <ContactList items={getNonFavorites(contacts.items)} />
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
  const { title = 'Contacts', items } = props
  if (items.length === 0) return null
  return (
    <>
      <Title>{title}</Title>
      {items.map(contact => (
        <Contact key={contact._id} contact={contact} />
      ))}
    </>
  )
}

function Contact(props) {
  const { contact } = props
  return (
    <div className="box notification is-white">
      <p>{contact.username}</p>
    </div>
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
  onUpdateContact: actions.updateContact,
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
