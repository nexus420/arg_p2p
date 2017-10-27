import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import 'babel-polyfill'

import es6Promise from 'es6-promise'
import 'isomorphic-fetch'

import configureStore from 'js/config/store'
import App from 'js/views/App'

import boot from './boot'

import 'scss/style.scss'

boot()

es6Promise.polyfill()

const store = configureStore()

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <HashRouter>
          <Component />
        </HashRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./views/App/', () => {
    const NewClient = require('./views/App/index').default

    render(NewClient)
  })
}
