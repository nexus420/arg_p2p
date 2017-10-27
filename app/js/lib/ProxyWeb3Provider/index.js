export default class ProxyWeb3Provider {
  constructor (web3Provider) {
    this._web3Provider = web3Provider
    this._proxyMethods = {}
  }

  static get isAragon () {
    return true
  }

  proxy (method, handler) {
    if (this._proxyMethods[method]) {
      throw new Error(`${method} this method has already been proxied`)
    }

    this._proxyMethods[method] = handler
  }

  handleProxy (params, cb) {
    const proxyHandler = this._proxyMethods[params.method]

    if (proxyHandler) {
      console.log(`Proxying ${params.method}`)

      proxyHandler(params, (err, allowed) => {
        if (err) {
          return cb(err)
        }

        return cb(null, allowed)
      })
    } else cb(null, true)
  }

  sendAsync (params, cb) {
    const method = params.method

    if (!method) {
      throw new Error('invalid method')
    }

    this.handleProxy(params, (err, allowed) => {
      if (err) {
        return cb(err)
      }

      if (!allowed) {
        return cb(null, {
          error: {
            message: 'Aragon: User denied transaction signature.'
          }
        })
      }

      this._web3Provider.sendAsync(params, (err, data) => {
        if (err) {
          console.error(data.method, err)

          return cb(err)
        }

        console.log(params.method, err, data)

        cb(null, data)
      })
    })
  }

  // tap (method, handler) {
  //   this.eth.getAccounts().then(accounts => {
  //     this.eth.defaultAccount = accounts[0]
  //
  //     // web3.eth.sendTransaction({
  //     //   from: web3.eth.defaultAccount,
  //     //   gasPrice: '20000000000',
  //     //   gas: '21000',
  //     //   to: '0x3535353535353535353535353535353535353535',
  //     //   value: '1000000000000000000',
  //     //   data: ''
  //     // }).then(console.log)
  //   })
  //
  //   window.web3 = new Web3({
  //     sendAsync: function (params, cb) {
  //       this.currentProvider.sendAsync(params, (err, data) => {
  //         if (err) {
  //           console.error(data.method, err)
  //
  //           return cb(err)
  //         }
  //
  //         console.log(params.method, err, data)
  //
  //         cb(null, data)
  //       })
  //     }
  //   })
  // }
}
