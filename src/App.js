import React from 'react'
import createHistory from 'history/createHashHistory'
import { styled, AragonApp } from '@aragon/ui'
import { Settings } from './apps'
import MenuPanel from './components/MenuPanel/MenuPanel'
import { apps, appStates, notifications } from './demo-state'

const AppContent = styled.div`
  position: fixed;
  left: 220px;
  right: 0;
  height: 100vh;
  overflow-x: auto;
`

class App extends React.Component {
  state = {
    path: '',
    sidePanelOpened: false,
    notifications,
  }
  constructor() {
    super()
    this.history = createHistory()
    this.state.path = this.history.location.pathname
    this.history.listen(this.handleNavigation)
  }
  appInstance() {
    const matches = this.state.path.match(/^\/?([a-z]+)\/?([a-zA-Z0-9]+)?/)
    if (!matches) {
      return { app: 'home', instance: '' }
    }
    return {
      app: matches[1],
      instance: matches[2],
    }
  }
  handleNavigation = location => {
    this.setState({ path: location.pathname })
  }
  handlePathChange = path => {
    if (path !== this.state.path) {
      this.history.push(path)
    }
  }
  openSidePanel = () => {
    this.setState({ sidePanelOpened: true })
  }
  closeSidePanel = () => {
    this.setState({ sidePanelOpened: false })
  }
  renderAppFrontend(app, instance) {
    if (app === 'settings') {
      return <Settings {...appStates[app]} />
    }
  }
  render() {
    const { notifications } = this.state
    const { app, instance } = this.appInstance()
    return (
      <AragonApp publicUrl="/aragon-ui/">
        <MenuPanel
          apps={apps}
          activeApp={app}
          activeInstance={instance}
          notifications={notifications}
          onPathChange={this.handlePathChange}
        />
        <AppContent>{this.renderAppFrontend(app, instance)}</AppContent>
      </AragonApp>
    )
  }
}

export default App
