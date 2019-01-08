import React from 'react'

import './Login.css'
import { Button, Input } from './utils'

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
      <div className="Login">
        <div className="Login-header">
          <h1 className="Login-logo">Ekki</h1>
          <Button onClick={this.handleSwitchMode}>
            {mode === LOGIN ? SIGNUP : LOGIN}
          </Button>
        </div>
        <form className="Login-form">
          <h2>{mode === LOGIN ? LOGIN : SIGNUP}</h2>
          <Input placeholder="Username" />
          <Input placeholder="Password" type="password" />
          {mode === SIGNUP && (
            <Input placeholder="Confirm Password" type="password" />
          )}
          <Button type="submit" onClick={this.handleSubmit}>
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

export default Login
