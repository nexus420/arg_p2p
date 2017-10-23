import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import logger from 'js/lib/dev/logger'
import rootReducer from 'js/reducers'

const isProduction = process.env.NODE_ENV === 'production'

export default () => {
  let store = null
  let middleware = null

  if (isProduction) {
    middleware = applyMiddleware(thunk)
  } else {
    middleware = applyMiddleware(thunk, logger)

    if (window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
      middleware = compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
      )
    }
  }

  store = createStore(
    rootReducer,
    middleware
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
