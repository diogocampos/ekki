import React from 'react'
import { connect } from 'react-redux'

import Form from './Form'
import Navbar, { NavbarItem } from './Navbar'
import { Button, Field, Title } from './utils'
import { actions } from '../state'

const LOGIN = 'Log in'
const SIGNUP = 'Sign up'

class Login extends React.Component {
  state = {
    mode: LOGIN,
  }

  handleSwitchMode = () => {
    this.setState(state => ({
      mode: state.mode === LOGIN ? SIGNUP : LOGIN,
    }))
  }

  handleSubmit = formData => {
    const { logIn, signUp } = this.props
    const action = this.state.mode === LOGIN ? logIn : signUp
    action(formData)
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
        <LoginBody>
          <Title>{mode === LOGIN ? LOGIN : SIGNUP}</Title>
          <Form onSubmit={this.handleSubmit}>
            <Field name="username" placeholder="Username" />
            <Field name="password" type="password" placeholder="Password" />
            {mode === SIGNUP && (
              <Field
                name="confirm"
                type="password"
                placeholder="Confirm password"
              />
            )}
            <Button className="is-inverted is-outlined" type="submit">
              Submit
            </Button>
          </Form>
        </LoginBody>
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

function LoginBody(props) {
  return (
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="columns is-centered is-mobile">
          <div className="column is-narrow">{props.children}</div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  logIn: actions.logIn,
  signUp: actions.signUp,
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
