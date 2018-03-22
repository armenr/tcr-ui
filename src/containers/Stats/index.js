import React, { Component } from 'react'

import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
import Fade from 'material-ui/transitions/Fade'

import Identicon from 'components/Identicon'
import { withCommas, trimDecimalsThree } from '../../utils/_values'
import styled from 'styled-components'
import { colors } from '../../global-styles'

class Stats extends Component {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state
    const {
      account,
      candidates,
      whitelist,
      balances,
      contracts,
      network,
    } = this.props

    const items = []

    return (
      <GridContainer>
        <GridItem>
          <CapsDiv>{'total applications'}</CapsDiv>
          <BoldDiv>{candidates.size}</BoldDiv>
        </GridItem>

        <GridItem>
          <CapsDiv>{'total tokens at stake'}</CapsDiv>
          <BoldDiv>{'3500'}</BoldDiv>
        </GridItem>

        <GridItem>
          <CapsDiv>{'listings in registry'}</CapsDiv>
          <BoldDiv>{whitelist.size}</BoldDiv>
        </GridItem>

        <UserInfoGridItem>
          <UserItem>
            <BoldDivColored network={network}>{network}</BoldDivColored>
          </UserItem>
          <UserItem>
            <BoldDiv>
              {withCommas(trimDecimalsThree(balances.get('ETH')))}
              <BoldDivGrey>{'ΞTH'}</BoldDivGrey>
            </BoldDiv>
          </UserItem>
          <UserItem>
            <BoldDiv>
              {withCommas(trimDecimalsThree(balances.get('token')))}
              <BoldDivGrey>{contracts.get('tokenSymbol')}</BoldDivGrey>
            </BoldDiv>
          </UserItem>

          <div>
            <Button
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <Identicon address={account} diameter={30} />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              transition={Fade}
            >
              <MenuItem onClick={this.handleClose}>
                <div>{`Account: ${account.substring(0, 10)}...`}</div>
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <div>{network}</div>
              </MenuItem>
            </Menu>
          </div>
        </UserInfoGridItem>
      </GridContainer>
    )
  }
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 9fr 6fr 6fr 11fr;
  grid-column-gap: 2px;
  align-items: center;
  height: 5.5em;
  color: ${colors.offBlack};
  background-color: lightgrey; // grid-line color
  border: 1px solid black;
  box-sizing: border-box;
`
const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  padding: 0 2em;
  background-color: white;
`
const CapsDiv = styled.div`
  text-transform: uppercase;
`
const BoldDiv = styled(CapsDiv)`
  color: black;
  font-weight: bold;
  font-size: 1.2em;
`
const BoldDivGrey = styled(BoldDiv)`
  display: inline;
  color: grey;
  margin-left: 0.5em;
  font-size: 0.8em;
`
const BoldDivColored = styled(BoldDiv)`
  color: ${props =>
    props.network === 'rinkeby'
      ? 'orange'
      : props.network === 'main' ? 'turquoise' : 'black'};
`
const UserInfoGridItem = styled(GridItem)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`
const UserItem = styled.div`
  margin: 0 0.3em;
`

export default Stats