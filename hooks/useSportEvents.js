import { gql, useQuery } from '@apollo/client'

// this query retrieves data for 10 upcoming events that have not yet started
const QUERY = `
  query Games($where: Game_filter!) {
    games(first: 10, where: $where) {
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
`

export default function useSportEvents() {
  return useQuery(gql`${QUERY}`, {
    variables: {
      where: {
        // note that the value of "startAt" is in seconds
        startsAt_gt: Math.floor(Date.now() / 1000),
        sport_: { name: 'Football' },
      },
    },
  })
}
