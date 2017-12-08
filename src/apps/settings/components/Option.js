import React from 'react'
import { font, styled } from '@aragon/ui'

const Container = styled.div`
  padding: 30px 0;
  border-top: 1px solid #e8e8e8;

  &:first-child {
    padding-top: 0;
    border: none;
  }
  &:last-child {
    padding-bottom: 0;
  }
`

const Header = styled.h2`
  ${font({ size: 'large', weight: 'bold' })};
  margin-bottom: 15px;
`

const SubText = styled.p`
  margin-bottom: 15px;
`

const Option = ({ children, name, text, ...props }) => (
  <Container {...props}>
    <Header>{name}</Header>
    <SubText>{text}</SubText>
    {children}
  </Container>
)

export default Option
