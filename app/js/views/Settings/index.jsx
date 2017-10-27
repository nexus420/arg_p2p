import React, { Component } from 'react'

import { FormGroup, Label, Input } from 'reactstrap'

export default class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      orgAddress: '0x0'
    }
  }
  render () {
    return (
      <div className='full-height'>
        <nav className='navbar navbar-light bg-white app-navbar' name='navbar'>
          <a className='navbar-brand'>Settings</a>
        </nav>
        <div className='row full-height row-with-bottom-bar row-navbar'>
          <div className='col-8 full-height scrollable app-panel bottom-space'>
            <h1 className='main-heading'>Organization Address</h1>

            <h1 className='main-heading text-muted'>This organization is deployed on the /network/</h1>

            <FormGroup>
              <Label className='action-heading'>Address:</Label>
              <Input type='text' name='org_address' placeholder='with a placeholder' defaultValue={this.state.orgAddress} disabled />
            </FormGroup>
          </div>
        </div>
      </div>
    )
  }
}
