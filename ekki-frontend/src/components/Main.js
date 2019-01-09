import React from 'react'
import { connect } from 'react-redux'

import Navbar, { NavbarItem } from './Navbar'
import { actions } from '../state'

class Main extends React.Component {
  handleLogOut = () => {
    this.props.logOut()
  }

  render() {
    return (
      <div>
        <Navbar>
          <NavbarItem onClick={this.handleLogOut}>Log out</NavbarItem>
        </Navbar>
        <p>Welcome</p>
      </div>
    )
  }
}

const mapDispatchToProps = {
  logOut: actions.logOut,
}

export default connect(
  null,
  mapDispatchToProps
)(Main)
