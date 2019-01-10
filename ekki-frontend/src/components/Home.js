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
        {balance.isFetching ? (
          <Spinner />
        ) : (
          <>
            <Title>Welcome, {user.username}</Title>
            <Subtitle>Your balance is</Subtitle>
            <Balance value={balance.value} />
          </>
        )}
      </HomeContainer>
    )
  }
}

function HomeContainer(props) {
  return (
    <div className="hero">
      <div className="hero-body">
        <div className="container has-text-centered">{props.children}</div>
      </div>
    </div>
  )
}

function Balance(props) {
  const { value } = props
  const [integer, fraction] = formatCurrency(value).split('.')
  return (
    <p className="has-text-primary">
      <span className="subtitle is-4">$</span>
      <span className="title is-1">{integer}</span>
      <span className="title is-2">.{fraction}</span>
    </p>
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
