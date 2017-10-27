import { Map } from 'immutable'

import {
  CHANGE_DEFAULT_ADDRESS,
  INIT_INSTALLED_APPS,
  IFRAME_LOADING,
  IFRAME_READY
} from 'js/actions/constants'

const initialState = Map({
  defaultAccount: null,
  iframeLoading: true,
  installedApps: {
    'test': {
      name: 'Test',
      instances: {
        'default': {
          name: 'Test',
          location: {
            ipfs: 'QmdWGXe2FeTcXSf4in86C5P5W5ZBNBeXB5VnBsJB8LLBRr'
          }
        }
      },
      metadata: {}
    },
    'voting': {
      name: 'Voting'
    },
    'groups': {
      name: 'Groups'
    },
    'finance': {
      name: 'Finance'
    },
    'fundraising': {
      name: 'Fundraising'
    },
    'permissions': {
      name: 'Permissions'
    },
    'identity': {
      name: 'Identity'
    }
  }
})

const actionsMap = {
  [CHANGE_DEFAULT_ADDRESS]: (state, action) => {
    return state.merge(Map({
      defaultAccount: action.data
    }))
  },
  [INIT_INSTALLED_APPS]: (state, action) => {
    return state.merge(Map({
      installedApps: action.data
    }))
  },
  [IFRAME_LOADING]: (state) => {
    return state.merge(Map({
      iframeLoading: true
    }))
  },
  [IFRAME_READY]: (state) => {
    return state.merge(Map({
      iframeLoading: false
    }))
  }
}

export default function reducer (state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
