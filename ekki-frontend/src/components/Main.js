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

const getTab = () => +localStorage.getItem('tab')
const saveTab = index => localStorage.setItem('tab', index)

class Main extends React.Component {
  state = { activeTab: getTab() }

  handleClickTab = index => {
    this.setState(state => ({ activeTab: index }))
    saveTab(index)
  }

  render() {
    const { activeTab } = this.state
    const { onLogOut } = this.props
    const TabContent = TABS[activeTab].component
    return (
      <div>
        <Navbar>
          <NavbarItem onClick={onLogOut}>Log out</NavbarItem>
        </Navbar>
        <Tabs onClick={this.handleClickTab}>
          {TABS.map((tab, i) => (
            <Tab key={i} index={i} activeIndex={activeTab} label={tab.label} />
          ))}
        </Tabs>
        <TabContent />
      </div>
    )
  }
}

function Tabs(props) {
  const { onClick } = props
  return (
    <div className="container">
      <div className="tabs is-centered">
        <ul>
          {React.Children.map(props.children, child =>
            React.cloneElement(child, { onClick })
          )}
        </ul>
      </div>
    </div>
  )
}

function Tab(props) {
  const { index, activeIndex, label, onClick } = props
  return (
    <li className={classNames(activeIndex === index && 'is-active')}>
      {/*eslint-disable-next-line*/}
      <a onClick={() => onClick(index)}>{label}</a>
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
