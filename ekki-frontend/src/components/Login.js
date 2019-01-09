import React from 'react'
import { connect } from 'react-redux'

import Form from './Form'
import Navbar, { NavbarItem } from './Navbar'
import { Button, Field, Title } from './utils'
import { actions } from '../state'

const LOGIN = 'Log in'
const SIGNUP = 'Sign up'

class Login extends React.Component {
  state = { mode: LOGIN }

  handleSwitchMode = () => {
    this.setState(state => ({ mode: state.mode === LOGIN ? SIGNUP : LOGIN }))
  }

  handleSubmit = formData => {
    const { onLogIn, onSignUp } = this.props
    const action = this.state.mode === LOGIN ? onLogIn : onSignUp
    action(formData)
  }

  render() {
    const { mode } = this.state
    const { errors } = this.props
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
            <Field
              name="username"
              placeholder="Username"
              errorMessage={errors.username}
            />
            <Field
              name="password"
              type="password"
              placeholder="Password"
              errorMessage={errors.password}
            />
            {mode === SIGNUP && (
              <Field
                name="confirm"
                type="password"
                placeholder="Confirm password"
                errorMessage={errors.confirm}
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

const mapStateToProps = state => ({
  errors: state.auth.errors || {},
})

const mapDispatchToProps = {
  onLogIn: actions.logIn,
  onSignUp: actions.signUp,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
