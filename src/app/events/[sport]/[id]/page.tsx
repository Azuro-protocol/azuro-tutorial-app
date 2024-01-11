'use client'
import { useParams } from 'next/navigation'
import { useGame, useGameMarkets } from '@azuro-org/sdk'
import { GameInfo, GameMarkets } from '@/components'


const Info = () => {
  const params = useParams<{ id: string }>()

  const { loading, data } = useGame({
    gameId: params.id,
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return (
      <div>Game info not found</div>
    )
  }

  return <GameInfo game={data} />
}

const Markets = () => {
  const params = useParams<{ id: string }>()

  const { loading, data } = useGameMarkets({
    gameId: params.id,
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return null
  }

  return <GameMarkets gameId={params.id} markets={data!} />
}

export default function Game() {

  return (
    <>
      <Info />
      <Markets />
    </>
  )
}
