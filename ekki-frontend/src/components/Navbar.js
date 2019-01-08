import classNames from 'classnames'
import React from 'react'

class Navbar extends React.Component {
  state = { isMenuOpen: false }

  handleToggleMenu = () => {
    this.setState(state => ({ isMenuOpen: !state.isMenuOpen }))
  }

  render() {
    const { isMenuOpen } = this.state
    return (
      <nav className="navbar">
        <div className="container">
          <NavbarBrand active={isMenuOpen} onToggleMenu={this.handleToggleMenu}>
            <h1 className="title is-italic">Ekki</h1>
          </NavbarBrand>
          <NavbarMenu active={isMenuOpen}>{this.props.children}</NavbarMenu>
        </div>
      </nav>
    )
  }
}

function NavbarBrand(props) {
  const { active, onToggleMenu } = props
  return (
    <div className="navbar-brand">
      <div className="navbar-item">{props.children}</div>
      <span
        className={classNames('navbar-burger burger', active && 'is-active')}
        onClick={onToggleMenu}
      >
        <span />
        <span />
        <span />
      </span>
    </div>
  )
}

function NavbarMenu(props) {
  const { active } = props
  return (
    <div className={classNames('navbar-menu', active && 'is-active')}>
      <div className="navbar-end">
        {React.Children.map(props.children, child =>
          React.cloneElement(child, {
            className: classNames('navbar-item', child.props.classNames),
          })
        )}
      </div>
    </div>
  )
}

export function NavbarItem(props) {
  return (
    //eslint-disable-next-line
    <a {...props}>{props.children}</a>
  )
}

export default Navbar
