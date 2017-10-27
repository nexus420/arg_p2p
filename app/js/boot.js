/* global web3 */

import Web3 from 'web3'

import ProxyWeb3Provider from 'js/lib/ProxyWeb3Provider'

if (typeof web3 === 'undefined') {
  window.alert('Please install MetaMask. https://metamask.io')

  throw new Error('No injected web3 provider found')
}

export default function () {
  window.injectedWeb3Provider = web3.currentProvider

  const proxyWeb3Provider = new ProxyWeb3Provider(window.injectedWeb3Provider)

  window.web3 = new Web3(proxyWeb3Provider)

  web3.eth.getAccounts().then(accounts => {
    web3.eth.defaultAccount = accounts[0]
  })
}
