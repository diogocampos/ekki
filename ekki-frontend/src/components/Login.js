import React from 'react'
import { connect } from 'react-redux'

import Form, { Field } from './Form'
import Navbar, { NavbarItem } from './Navbar'
import { Button, Title } from './utils'
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
          <LoginForm mode={mode} errors={errors} onSubmit={this.handleSubmit} />
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
      <div className="container has-text-centered">{props.children}</div>
    </div>
  )
}

function LoginForm(props) {
  const { mode, errors, onSubmit } = props
  return (
    <Form onSubmit={onSubmit}>
      <Field
        className="is-primary is-medium"
        name="username"
        placeholder="Username"
        errorMessage={errors.username}
      />
      <Field
        className="is-primary is-medium"
        name="password"
        type="password"
        placeholder="Password"
        errorMessage={errors.password}
      />
      {mode === SIGNUP && (
        <Field
          className="is-primary is-medium"
          name="confirm"
          type="password"
          placeholder="Confirm password"
          errorMessage={errors.confirm}
        />
      )}
      <Button className="is-medium is-inverted is-outlined" type="submit">
        Submit
      </Button>
    </Form>
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
