import { gql, useQuery } from '@apollo/client'
import { useEthers } from '@usedapp/core'

const QUERY = `
  query BetsHistory($first: Int, $where: Bet_filter!) {
    bets(
      first: $first,
      orderBy: createdBlockTimestamp,
      orderDirection: desc,
      where: $where,
      subgraphError: allow
    ) {
      id
      betId
      amount
      potentialPayout
      status
      isRedeemed
      odds
      createdAt: createdBlockTimestamp
      txHash: createdTxHash
      outcome {
        id
        outcomeId
        condition {
          id
          conditionId
          wonOutcome {
            outcomeId
          }
          core {
            address
            liquidityPool {
              address
            }
          }
        }
      }
      game {
        id
        sport {
          name
        }
        league {
          name
          country {
            name
          }
        }
        participants {
          name
          image
        }
        startsAt
      }
    }
  }
`

export default function useBetsHistory() {
  const { account } = useEthers()

  return useQuery(gql`${QUERY}`, {
    variables: {
      first: 10, // in this tutorial, only 10 bets are loaded. In production, pagination loading should be implemented to avoid heavy requests which can lead to GraphQL errors
      where: {
        actor: account?.toLowerCase(),
      },
    },
    skip: !account,
  })
}
