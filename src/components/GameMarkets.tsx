'use client'
import { useState } from 'react'
import type { GameMarkets, MarketOutcome } from '@azuro-org/sdk'
import { OutcomeButton, PlaceBetModal } from '@/components'


type GameMarketsProps = {
  gameId: string
  markets: GameMarkets
}

export function GameMarkets(props: GameMarketsProps) {
  const { gameId, markets } = props

  const [ selectedOutcome, setSelectedOutcome ] = useState<MarketOutcome>()

  const handleOutcomeClick = (outcome: any) => {
    setSelectedOutcome(outcome)
  }

  const handleModalClose = () => {
    setSelectedOutcome(undefined)
  }

  return (
    <>
      <div className="max-w-[600px] mx-auto mt-12 space-y-6">
        {
          markets?.map(({ name, description, outcomeRows }) => (
            <div key={name} className="">
              <div className="mb-0.5 text-lg font-semibold">{name}</div>
              <div className="mb-2 text-md text-zinc-500">{description}</div>
              <div className="space-y-1">
                {
                  outcomeRows.map((outcomes, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="flex gap-2 w-full">
                        {
                          outcomes.map((outcome) => (
                            <OutcomeButton
                              key={outcome.selectionName}
                              className={selectedOutcome === outcome ? 'bg-purple-200' : ''}
                              outcome={outcome}
                              onClick={() => handleOutcomeClick(outcome)}
                            />
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
      {
        Boolean(selectedOutcome) && (
          <PlaceBetModal
            gameId={gameId}
            outcome={selectedOutcome!}
            closeModal={handleModalClose}
          />
        )
      }
    </>
  )
}
