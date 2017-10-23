import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from 'js/views/Dashboard'
import NotFound from 'js/views/NotFound'

const baseURL = '/'

// const makeURL = (path) => `${baseURL}${path}`

export const routeCodes = {
  DASHBOARD: baseURL
}

export default () => (
  <Switch>
    <Route exact path={baseURL} component={Dashboard} />
    <Route path='*' component={NotFound} />
  </Switch>
)
