import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'

@connect(state => ({
  installedApps: state.app.get('installedApps')
}))
export default class SideNavbar extends Component {
  static propTypes = {
    installedApps: PropTypes.object
    // dispatch: PropTypes.func
  }

  render () {
    const { installedApps } = this.props

    const appList = Object.keys(installedApps).map(key => {
      const app = installedApps[key]
      const path = `/app-browser/${key}`

      return (
        <NavLink to={path} className='nav-item' activeClassName='active' exact key={key}>
          <span className='nav-link'>{app.name}</span>
        </NavLink>
      )
    })

    return (
      <div>
        <small className='text-muted app-label'>Apps</small>
        <ul className='nav flex-column app-list'>
          <NavLink to='/' className='nav-item' activeClassName='active' exact>
            <span className='nav-link'>Home</span>
          </NavLink>
          {appList.length > 0 ? appList : null}
          <NavLink to='/settings' className='nav-item' activeClassName='active' exact>
            <span className='nav-link'>Settings</span>
          </NavLink>
        </ul>
      </div>
    )
  }
}
