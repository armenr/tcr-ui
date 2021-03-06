import React, { Component } from 'react'

import { MarginDiv } from 'components/StyledHome'
import { fromTokenBase } from 'libs/units'
import Button from 'components/Button'

import { SideSplit, SideText } from 'containers/Transactions/components'
import SidePanelSeparator from './components/SidePanelSeparator'
import SidePanel from './components/SidePanel'
import { TransactionsContext } from './index'

export default class UpdateStatus extends Component {
  state = {
    didCommit: false,
    didReveal: false,
    numTokens: '',
    votesFor: '',
    votesAgainst: '',
  }

  render() {
    return (
      <TransactionsContext.Consumer>
        {({ selectedOne, closeTxPanel, onSendTx, opened, tcr }) => (
          <SidePanel
            title="Update a listing's status"
            opened={opened === 'updateStatus'}
            onClose={closeTxPanel}
          >
            {selectedOne && (
              <div>
                <SideSplit
                  leftTitle={'Votes For'}
                  leftItem={fromTokenBase(selectedOne.votesFor, tcr.tokenDecimals)}
                  rightTitle={'Votes Against'}
                  rightItem={fromTokenBase(selectedOne.votesAgainst, tcr.tokenDecimals)}
                />
                <SideSplit
                  leftTitle={'Tokens you voted with'}
                  leftItem={
                    selectedOne && fromTokenBase(selectedOne.userVotes, tcr.tokenDecimals)
                  }
                  rightTitle={'Total Votes'}
                  rightItem={
                    selectedOne &&
                    fromTokenBase(selectedOne.totalVotes, tcr.tokenDecimals)
                  }
                />
                <SideText text={selectedOne && selectedOne.listingID} />
              </div>
            )}

            <SidePanelSeparator />

            <MarginDiv>
              {selectedOne && (
                <Button
                  onClick={e => onSendTx('updateStatus', {})}
                  mode="strong"
                  wide
                  methodName="updateStatus"
                >
                  {'UPDATE STATUS'}
                </Button>
              )}
            </MarginDiv>
          </SidePanel>
        )}
      </TransactionsContext.Consumer>
    )
  }
}
