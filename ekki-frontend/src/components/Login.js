import React from 'react'

import Navbar, { NavbarItem } from './Navbar'

const LOGIN = 'Log In'
const SIGNUP = 'Sign Up'

class Login extends React.Component {
  state = {
    mode: LOGIN,
  }

  handleSwitchMode = () => {
    this.setState(state => ({
      mode: state.mode === LOGIN ? SIGNUP : LOGIN,
    }))
  }

  handleSubmit = event => {
    event.preventDefault()
    //...
  }

  render() {
    const { mode } = this.state
    return (
      <LoginContainer>
        <LoginHeader>
          <Navbar>
            <NavbarItem onClick={this.handleSwitchMode}>
              {mode === LOGIN ? SIGNUP : LOGIN}
            </NavbarItem>
          </Navbar>
        </LoginHeader>
      </LoginContainer>
    )
  }
}

function LoginContainer(props) {
  return (
    <section className="hero is-primary is-fullheight">
      {props.children}
    </section>
  )
}

function LoginHeader(props) {
  return <div className="hero-head">{props.children}</div>
}

export default Login
