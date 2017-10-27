import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from 'reactstrap'

import SimplePostMessage from 'js/lib/iFrameSync/post-message'

import { iFrameReady, iFrameBusy } from 'js/actions/app'

@connect(state => ({
  installedApps: state.app.get('installedApps'),
  iframeLoading: state.app.get('iframeLoading')
}))
export default class AppBrowser extends Component {
  static propTypes = {
    installedApps: PropTypes.object,
    iframeLoading: PropTypes.bool,
    match: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      modal: false,
      modalData: {},
      fromAddress: window.web3.eth.defaultAccount
    }

    this.toggle = this.toggle.bind(this)
    this.approve = this.approve.bind(this)
    this.reject = this.reject.bind(this)
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    })
  }

  approve () {
    window.web3.eth.sendTransaction(Object.assign(this.state.modalData, {
      from: this.state.fromAddress
    }))
      .then(r => console.log(r))
      .catch(e => {
        console.error(e)
        this.pm.send({
          type: 'result',
          data: 'opps.. something went wrong',
          timestamp: new Date()
        })
      })
    this.toggle()
  }

  reject () {
    this.toggle()
  }

  componentWillUnmount () {
    this.pm.removeListener()
    const { dispatch } = this.props
    dispatch(iFrameBusy())
    console.log('remove listener')
  }

  componentDidMount () {
    const { dispatch } = this.props

    console.log('add listener')

    this.pm = new SimplePostMessage(this.iframe.contentWindow, '*', (obj) => {
      console.log(obj.type, obj.timestamp)

      if (obj.type === 'ready' && obj.timestamp) {
        dispatch(iFrameReady())
      }

      if (obj.type === 'tx' && obj.timestamp) {
        this.setState({
          modalData: obj
        })
        this.toggle()
      }
    })
  }

  render () {
    const { installedApps, match, iframeLoading } = this.props

    console.log('iframeLoading', iframeLoading)

    const app = installedApps[match.params.appName]
    const url = `https://ipfs.io/ipfs/${app.instances.default.location.ipfs}`

    return (
      <div className='full-height'>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>Transaction Viewer</ModalHeader>
          <ModalBody>
            <code>
              Method: {this.state.modalData.method}<br />
              Data: {JSON.stringify(this.state.modalData, null, 2)}<br />
              from: {this.state.fromAddress}
            </code>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.approve}>Approve</Button>{' '}
            <Button color='danger' onClick={this.reject}>Reject</Button>
          </ModalFooter>
        </Modal>
        <nav className='navbar navbar-light bg-white app-navbar' name='navbar'>
          <a className='navbar-brand'>{app.name}</a>
        </nav>
        <div style={
          {
            display: iframeLoading ? 'block' : 'none'
          }
        }>
          <br />
          <Progress animated value={100} />
        </div>
        <iframe src={url} width='100%' height='100%' className='app-browser' style={
          {
            display: iframeLoading ? 'none' : 'block'
          }
        } ref={(iframe) => { this.iframe = iframe }} />
      </div>
    )
  }
}
