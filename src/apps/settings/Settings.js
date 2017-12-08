import React from 'react'
import {
  styled,
  theme,
  AppBar,
  Button,
  DropDown,
  Field,
  Input,
} from '@aragon/ui'
import Option from './components/Option'

const Content = styled.div`
  padding: 30px;
  width: 500px;
`

const LinkButton = styled(Button.Anchor).attrs({
  compact: true,
  mode: 'outline',
})`
  background: ${theme.contentBackground};
`

class Settings extends React.Component {
  handleCurrencyChange = (index) => {
    // Send back up to app / node-aragon state
  }
  render() {
    const {
      currencies,
      network,
      networkName,
      organizationAddress,
      selectedCurrency,
    } = this.props
    const etherscanUrl = `https://${network === 'mainnet' ? '' : `${network}.`}etherscan.io/address/${organizationAddress}`
    return (
      <React.Fragment>
        <AppBar title="Your Settings" />
        <Content>
          <Option
            name="Organization Address"
            text={`This organization is deployed on the ${networkName}.`}
          >
            <Field label="Address:">
              <Input.Text readOnly wide value={organizationAddress} />
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
                items={currencies}
                active={currencies.indexOf(selectedCurrency)}
              />
            </Field>
          </Option>
        </Content>
      </React.Fragment>
    )
  }
}

export default Settings
