import React from 'react'
import { connect } from 'react-redux'

import Form, { Field } from './Form'
import { Button, Spinner, Title } from './utils'
import { actions } from '../state'

class CreditCards extends React.Component {
  componentDidMount() {
    this.props.getCards()
  }

  handleAddCard = formData => {
    this.props.onAddCard(formData)
  }

  handleDeleteCard = id => {
    this.props.onDeleteCard(id)
  }

  render() {
    const { cards } = this.props
    return (
      <div className="container ekki-container">
        {cards.isFetching ? (
          <Spinner />
        ) : cards.items.length ? (
          <>
            <Title>Credit cards</Title>
            <Cards items={cards.items} onDelete={this.handleDeleteCard} />
          </>
        ) : null}

        <Title>Add a card</Title>
        <AddCardForm errors={cards.errors} onSubmit={this.handleAddCard} />
      </div>
    )
  }
}

function Cards(props) {
  let { items, onDelete } = props
  return (
    <div className="columns is-multiline is-centered is-mobile">
      {items.map(card => (
        <div key={card._id} className="column is-narrow">
          <Card card={card} onDelete={onDelete} />
        </div>
      ))}
    </div>
  )
}

function Card(props) {
  const { card, onDelete } = props
  return (
    <div className="ekki-card box notification">
      <button className="delete" onClick={() => onDelete(card._id)} />
      <p>{card.number.replace(/\*/g, '•')}</p>
      <p>{card.expiry}</p>
      <p className="is-uppercase">{card.holder}</p>
    </div>
  )
}

function AddCardForm(props) {
  const { errors, onSubmit } = props
  return (
    <div className="columns is-centered is-mobile">
      <div className="column is-narrow">
        <Form onSubmit={onSubmit}>
          <Field
            name="number"
            placeholder="Card number"
            errorMessage={errors && errors.number}
          />
          <Field
            name="expiry"
            placeholder="Expiration date"
            errorMessage={errors && errors.expiry}
          />
          <Field
            name="holder"
            placeholder="Name in card"
            errorMessage={errors && errors.holder}
          />
          <div className="buttons is-right">
            <Button type="submit">Add</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  cards: state.cards,
})

const mapDispatchToProps = {
  getCards: actions.getCards,
  onAddCard: actions.addCard,
  onDeleteCard: actions.deleteCard,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditCards)
