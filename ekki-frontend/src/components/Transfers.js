import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'

import Form, { Field, SelectField } from './Form'
import { Button, Spinner, Title } from './utils'
import { formatCurrency } from '../lib/format'
import { actions } from '../state'

class Transfers extends React.Component {
  state = { cardId: '', password: '' }

  componentDidMount() {
    this.props.getTransfers()
    this.props.getCards()
  }

  handleMakeTransfer = formData => {
    const { cardId, password } = formData
    this.setState(() => ({ cardId, password }))
    this.props.onMakeTransfer(formData)
  }

  render() {
    const { transfers, cards, user } = this.props
    return (
      <div className="container ekki-container">
        <div className="columns">
          <div className="column">
            <TransferForm
              {...this.state}
              cards={cards}
              errors={transfers.errors}
              onSubmit={this.handleMakeTransfer}
            />
          </div>

          <div className="column">
            {transfers.isFetching ? (
              <Spinner />
            ) : (
              <TransferHistory items={transfers.items} user={user} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

function TransferForm(props) {
  const { cards, cardId, password, onSubmit } = props
  const errors = props.errors || {}
  return (
    <Form onSubmit={onSubmit}>
      <Title>Make a transfer</Title>

      <Field name="to" placeholder="To (username)" errorMessage={errors.to} />
      <Field name="amount" placeholder="Amount" errorMessage={errors.amount} />

      {(cardId || errors.cardId) && (
        <SelectField
          name="cardId"
          placeholder="Choose a card"
          options={cards.items.map(card => ({
            value: card._id,
            label: card.number,
          }))}
          errorMessage={errors.cardId}
        />
      )}

      {(password || errors.password) && (
        <Field
          name="password"
          type="password"
          placeholder="Password"
          errorMessage={errors.password}
        />
      )}

      <Button type="submit">Send</Button>
    </Form>
  )
}

function TransferHistory(props) {
  const { items, user } = props
  if (items.length === 0) return null
  return (
    <>
      <Title>Transfer history</Title>
      {items.map(transfer => (
        <Transfer key={transfer._id} transfer={transfer} user={user} />
      ))}
    </>
  )
}

function Transfer(props) {
  const { transfer: t, user } = props
  return (
    <article
      className={classNames(
        'message',
        t.receiver === user.username && 'is-success'
      )}
    >
      <div className="message-body">
        <table className="table ekki-transfer">
          <tbody>
            <tr>
              <th>Date</th>
              <td>{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
            {user.username !== t.sender && (
              <tr>
                <th>From</th>
                <td>{t.sender}</td>
              </tr>
            )}
            {user.username !== t.receiver && (
              <tr>
                <th>To</th>
                <td>{t.receiver}</td>
              </tr>
            )}
            {t.amountFromBalance ? (
              <tr>
                <th>From balance</th>
                <td>${formatCurrency(t.amountFromBalance)}</td>
              </tr>
            ) : null}
            {t.amountFromCard ? (
              <tr>
                <th>From card</th>
                <td>${formatCurrency(t.amountFromCard)}</td>
              </tr>
            ) : null}
            {t.amountFromBalance && t.amountFromCard ? (
              <tr>
                <th>Total</th>
                <td>
                  ${formatCurrency(t.amountFromBalance + t.amountFromCard)}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </article>
  )
}

const mapStateToProps = state => ({
  transfers: state.transfers,
  cards: state.cards,
  user: state.auth.user,
})

const mapDispatchToProps = {
  getTransfers: actions.getTransfers,
  getCards: actions.getCards,
  onMakeTransfer: actions.makeTransfer,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transfers)
