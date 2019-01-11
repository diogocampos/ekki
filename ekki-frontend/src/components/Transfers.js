import React from 'react'
import { connect } from 'react-redux'

import Form from './Form'
import { Spinner, Title } from './utils'
import { formatCurrency } from '../lib/format'
import { actions } from '../state'

class Transfers extends React.Component {
  componentDidMount() {
    this.props.getTransfers()
  }

  handleMakeTransfer = formData => {
    // TODO
    console.log(formData)
  }

  render() {
    const { transfers, errors } = this.props
    return (
      <div className="container ekki-container">
        <div className="columns">
          <div className="column">
            <TransferForm errors={errors} onSubmit={this.handleMakeTransfer} />
          </div>

          <div className="column">
            {transfers.isFetching ? (
              <Spinner />
            ) : (
              <TransferHistory items={transfers.items} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

function TransferForm(props) {
  const { onSubmit } = props
  return (
    <Form onSubmit={onSubmit}>
      <Title>Make a transfer</Title>
    </Form>
  )
}

function TransferHistory(props) {
  const { items } = props
  if (items.length === 0) return null
  return (
    <>
      <Title>Transfer history</Title>
      {items.map(transfer => (
        <Transfer key={transfer._id} transfer={transfer} />
      ))}
    </>
  )
}

function Transfer(props) {
  const { transfer: t } = props
  return (
    <div className="box">
      <table className="table">
        <tbody>
          <tr>
            <th>Date</th>
            <td>{new Date(t.createdAt).toLocaleString()}</td>
          </tr>
          <tr>
            <th>From</th>
            <td>{t.sender}</td>
          </tr>
          <tr>
            <th>To</th>
            <td>{t.receiver}</td>
          </tr>
          {!t.amountFromBalance ? null : (
            <tr>
              <th>From balance</th>
              <td>${formatCurrency(t.amountFromBalance)}</td>
            </tr>
          )}
          {!t.amountFromCard ? null : (
            <tr>
              <th>From card</th>
              <td>${formatCurrency(t.amountFromCard)}</td>
            </tr>
          )}
          {!t.amountFromBalance || !t.amountFromCard ? null : (
            <tr>
              <th>Total</th>
              <td>${formatCurrency(t.amountFromBalance + t.amountFromCard)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => ({
  transfers: state.transfers,
})

const mapDispatchToProps = {
  getTransfers: actions.getTransfers,
  onMakeTransfer: actions.makeTransfer,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transfers)
