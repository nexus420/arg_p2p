import React, { Component } from 'react'

export default class App extends Component {
  render () {
    return (
      <div className='full-height'>
        <nav className='navbar navbar-light bg-white app-navbar' name='navbar'>
          <a className='navbar-brand'>Welcome!</a>
        </nav>
        <div className='row full-height row-with-bottom-bar row-navbar'>
          <div className='col-8 full-height scrollable app-panel bottom-space'>
            <h1 className='main-heading'>What do you want to do?</h1>
            <div className='row'>
              <div className='col'>
                <div className='card'>
                  <img src='/svg/aragon.svg' />
                  <div className='card-body text-center'>
                    <h2 className='h6 card-title'>Transfer Tokens</h2>
                  </div>
                </div>
              </div>
              <div className='col'>
                <div className='card'>
                  <img src='/svg/aragon.svg' />
                  <div className='card-body text-center'>
                    <h2 className='h6 card-title'>Assign Tokens</h2>
                  </div>
                </div>
              </div>
              <div className='col'>
                <div className='card'>
                  <img src='/svg/aragon.svg' />
                  <div className='card-body text-center'>
                    <h2 className='h6 card-title'>Vote</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className='card'>
                  <img src='/svg/aragon.svg' />
                  <div className='card-body text-center'>
                    <h2 className='h6 card-title'>View Groups</h2>
                  </div>
                </div>
              </div>
              <div className='col'>
                <div className='card'>
                  <img src='/svg/aragon.svg' />
                  <div className='card-body text-center'>
                    <h2 className='h6 card-title'>Check Finance</h2>
                  </div>
                </div>
              </div>
              <div className='col'>
                <div className='card'>
                  <img src='/svg/aragon.svg' />
                  <div className='card-body text-center'>
                    <h2 className='h6 card-title'>New Payment</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-4 full-height scrollable action-panel bottom-space'>
            asdas
          </div>
        </div>
        <nav className='navbar navbar-light bg-white bottom-bar'>
          <span className='navbar-text'>
            <span>ETH $500</span>
            <span>ANT $800</span>
            <span>BTC $100</span>
          </span>
        </nav>
      </div>
    )
  }
}
