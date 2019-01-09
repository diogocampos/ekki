import React from 'react'
import { connect } from 'react-redux'

import Login from './Login'
import Main from './Main'
import { actions } from '../state'

class App extends React.Component {
  componentDidMount() {
    this.props.onMount()
  }

  render() {
    const { auth } = this.props
    if (auth.isFetching) return <Loading />
    return auth.user ? <Main /> : <Login />
  }
}

function Loading() {
  return (
    <div className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <button type="button" className="button is-loading is-white is-large">
            Loading…
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = {
  onMount: actions.getUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
