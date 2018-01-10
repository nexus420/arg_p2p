import React from 'react'
import {
  styled,
  theme,
  AppBar,
  Button,
  DropDown,
  Field,
  TextInput,
} from '@aragon/ui'
import Option from './components/Option'

const Main = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
`

const StyledAppBar = styled(AppBar)`
  flex-shrink: 0;
`

const ScrollWrapper = styled.div`
  height: 100%;
  overflow: auto;
`

const Content = styled.div`
  width: 500px;
  padding: 30px;
`

const LinkButton = styled(Button.Anchor).attrs({
  compact: true,
  mode: 'outline',
})`
  background: ${theme.contentBackground};
`

class Settings extends React.Component {
  handleCurrencyChange = index => {
    const { currencies, onAppStateChange } = this.props
    onAppStateChange('settings', {
      selectedCurrency: currencies[index],
    })
  }
  render() {
    const {
      currencies,
      network,
      networkName,
      organizationAddress,
      selectedCurrency,
    } = this.props
    const networkSubdomain = network === 'mainnet' ? '' : `${network}.`
    const etherscanUrl = `https://${networkSubdomain}etherscan.io/address/${
      organizationAddress
    }`
    return (
      <Main>
        <StyledAppBar title="Your Settings" />
        <ScrollWrapper>
          <Content>
            <Option
              name="Organization Address"
              text={`This organization is deployed on the ${networkName}.`}
            >
              <Field label="Address:">
                <TextInput readOnly wide value={organizationAddress} />
              </Field>
              <LinkButton href={etherscanUrl} target="_blank">
                See on Etherscan
              </LinkButton>
            </Option>
            <Option
              name="Currency"
              text="This will be the default currency for displaying purposes. It will be converted to ETH under the hood."
            >
              <Field label="Select currency">
                <DropDown
                  active={currencies.indexOf(selectedCurrency)}
                  items={currencies}
                  onChange={this.handleCurrencyChange}
                />
              </Field>
            </Option>
          </Content>
        </ScrollWrapper>
      </Main>
    )
  }
}

export default Settings
