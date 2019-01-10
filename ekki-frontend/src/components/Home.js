import React from 'react'
import { connect } from 'react-redux'

import { formatCurrency, Spinner, Subtitle, Title } from './utils'
import { actions } from '../state'

class Home extends React.Component {
  componentDidMount() {
    this.props.onMount()
  }

  render() {
    const { user, balance } = this.props
    return (
      <HomeContainer>
        {balance.isFetching && balance.value == null ? (
          <Spinner />
        ) : (
          <Balance username={user.username} value={balance.value} />
        )}
      </HomeContainer>
    )
  }
}

function HomeContainer(props) {
  return (
    <div className="hero">
      <div className="hero-body">{props.children}</div>
    </div>
  )
}

function Balance(props) {
  const { username, value } = props
  const [integer, fraction] = formatCurrency(value).split('.')
  return (
    <div className="container has-text-centered">
      <Title>Welcome, {username}</Title>
      <Subtitle>Your balance is</Subtitle>
      <p className="has-text-primary">
        <span className="subtitle is-4">$</span>
        <span className="title is-1">{integer}</span>
        <span className="title is-2">.{fraction}</span>
      </p>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  balance: state.balance,
})

const mapDispatchToProps = {
  onMount: actions.getBalance,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
