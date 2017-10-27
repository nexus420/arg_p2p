import React, { Component } from 'react'

import SideNavbar from 'js/components/SideNavbar'
import Routes from 'js/config/routes'

export default class App extends Component {
  render () {
    return (
      <div className='full-height'>
        <div className='row full-height'>
          <div className='col-2 left-panel'>
            <nav className='navbar navbar-light bg-white aragon-navbar'>
              <a className='navbar-brand'>
                <img src='/svg/aragon.svg' className='d-inline-block align-top' alt='Aragon Logo' />
              </a>
            </nav>
            <SideNavbar />
            <nav className='navbar navbar-light bg-white bottom-bar'>
              <img src='/svg/aragon.svg' />
              <span className='navbar-text'>hv.pizza</span>
            </nav>
          </div>
          <div className='col-10 full-height right-panel'>
            <Routes />
          </div>
        </div>
      </div>
    )
  }
}
