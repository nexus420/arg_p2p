import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from 'js/views/Dashboard'
import Settings from 'js/views/Settings'
import AppBrowser from 'js/views/AppBrowser'
import NotFound from 'js/views/NotFound'

const baseURL = '/'

const makeURL = (path) => `${baseURL}${path}`

export const routeCodes = {
  DASHBOARD: baseURL,
  SETTINGS: makeURL('settings'),
  APP_BROWSER: makeURL('app-browser/:appName')
}

export default () => (
  <Switch>
    <Route exact path={routeCodes.DASHBOARD} component={Dashboard} />
    <Route exact path={routeCodes.SETTINGS} component={Settings} />
    <Route path={routeCodes.APP_BROWSER} component={AppBrowser} />

    <Route path='*' component={NotFound} />
  </Switch>
)
