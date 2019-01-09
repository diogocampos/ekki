import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'

import CreditCards from './CreditCards'
import Contacts from './Contacts'
import Home from './Home'
import Navbar, { NavbarItem } from './Navbar'
import Transfers from './Transfers'
import { actions } from '../state'

const TABS = [
  { label: 'Home', component: Home },
  { label: 'Transfers', component: Transfers },
  { label: 'Contacts', component: Contacts },
  { label: 'Cards', component: CreditCards },
]

class Main extends React.Component {
  state = { activeTab: 0 }

  handleClickTab = index => {
    this.setState(state => ({ activeTab: index }))
  }

  render() {
    const { activeTab } = this.state
    const { onLogOut } = this.props
    const TabContents = TABS[activeTab].component
    return (
      <div className="container">
        <Navbar>
          <NavbarItem onClick={onLogOut}>Log out</NavbarItem>
        </Navbar>
        <Tabs onClick={this.handleClickTab}>
          {TABS.map((tab, i) => (
            <Tab key={i} id={i} activeId={activeTab} label={tab.label} />
          ))}
        </Tabs>
        <TabContents />
      </div>
    )
  }
}

function Tabs(props) {
  const { onClick } = props
  return (
    <div className="tabs is-centered">
      <ul>
        {React.Children.map(props.children, child =>
          React.cloneElement(child, { onClick })
        )}
      </ul>
    </div>
  )
}

function Tab(props) {
  const { id, activeId, label, onClick } = props
  return (
    <li className={classNames(activeId === id && 'is-active')}>
      {/*eslint-disable-next-line*/}
      <a onClick={() => onClick(id)}>{label}</a>
    </li>
  )
}

const mapDispatchToProps = {
  onLogOut: actions.logOut,
}

export default connect(
  null,
  mapDispatchToProps
)(Main)
