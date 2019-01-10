import React from 'react'
import { connect } from 'react-redux'

import { Button, Spinner, Title } from './utils'
import { actions } from '../state'

class CreditCards extends React.Component {
  componentDidMount() {
    this.props.getCards()
  }

  handleAddCard = () => {
    console.log('TODO: show form to add a card')
  }

  handleDeleteCard = id => {
    this.props.onDeleteCard(id)
  }

  render() {
    const { cards } = this.props
    return (
      <div className="container ekki-container">
        <CardsHeader onAdd={this.handleAddCard} />

        {cards.isFetching ? (
          <Spinner />
        ) : (
          <Cards items={cards.items} onDelete={this.handleDeleteCard} />
        )}
      </div>
    )
  }
}

function CardsHeader(props) {
  const { onAdd } = props
  return (
    <nav className="level is-mobile">
      <div className="level-left">
        <Title>Credit cards</Title>
      </div>
      <div className="level-right">
        <Button onClick={onAdd}>Add</Button>
      </div>
    </nav>
  )
}

function Cards(props) {
  let { items, onDelete } = props
  return items.length === 0 ? (
    <p className="has-text-centered">
      Click <strong>Add</strong> to add a card.
    </p>
  ) : (
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
