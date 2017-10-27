import { CHANGE_DEFAULT_ADDRESS, IFRAME_READY, OPEN_TX_MODAL, IFRAME_LOADING } from 'js/actions/constants'

export function changeDefaultAddress (data) {
  return {
    type: CHANGE_DEFAULT_ADDRESS,
    data
  }
}

export function iFrameReady () {
  return {
    type: IFRAME_READY
  }
}

export function iFrameBusy () {
  return {
    type: IFRAME_LOADING
  }
}

export function openTxModal () {
  return {
    type: OPEN_TX_MODAL
  }
}
