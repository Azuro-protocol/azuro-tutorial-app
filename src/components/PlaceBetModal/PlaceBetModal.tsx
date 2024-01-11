'use client'
import { useState } from 'react'
import { useGame, usePrepareBet, MarketOutcome } from '@azuro-org/sdk'
import { getMarketName } from '@azuro-org/dictionaries'
import { GameInfo } from '@/components'
import { AmountInput } from './AmountInput'
import { SubmitButton } from './SubmitButton'


function CheckBadgeIcon(props: { className?: string }) {
  return (
    <svg className={props.className} aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
        stroke-linecap="round"
        stroke-linejoin="round"></path>
    </svg>
  )
}

type Props = {
  gameId: string
  outcome: MarketOutcome
  closeModal: any
}

export function PlaceBetModal(props: Props) {
  const { gameId, outcome, closeModal } = props

  const { data } = useGame({ gameId })
  const [ amount, setAmount ] = useState('')
  const [ isSuccess, setSuccess ] = useState(false)

  const {
    isOddsLoading,
    totalOdds,
    isAllowanceLoading,
    isApproveRequired,
    submit,
    approveTx,
    betTx,
  } = usePrepareBet({
    amount,
    slippage: 5,
    affiliate: '0x0000000000000000000000000000000000000000', // your affiliate address
    selections: [ outcome ],
    onSuccess: () => {
      setSuccess(true)
    },
  })

  const marketName = getMarketName({ outcomeId: String(outcome.outcomeId) })
  const isPending = approveTx.isPending || betTx.isPending
  const isProcessing = approveTx.isProcessing  || betTx.isProcessing

  return (
    <div
      className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-20"
      onClick={closeModal}
    >
      <div
        className="w-[480px] bg-white max-h-[calc(100vh-40px)] overflow-y-auto no-scrollbar rounded-[40px] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {
          isSuccess ? (
            <div className="flex flex-col items-center justify-center h-[400px]">
              <CheckBadgeIcon className="w-28 h-28 text-purple-500" />
              <div className="mt-5 text-2xl font-semibold">Success!</div>
            </div>
          ) : (
            <>
              <GameInfo game={data!} />
              <div className="pt-4 px-6 pb-6">
                <div className="grid grid-cols-[auto_1fr] gap-y-3 mt-2 text-md">
                  <span className="text-zinc-400">Market</span>
                  <span className="text-right font-semibold">{marketName}</span>
                  <span className="text-zinc-400">Selection</span>
                  <span className="text-right font-semibold">{outcome.selectionName}</span>
                  <span className="text-zinc-400">Odds</span>
                  <span className="text-right font-semibold">
                    {isOddsLoading ? 'Loading...' : (
                      totalOdds !== undefined ? (
                        <>{(+totalOdds).toFixed(3)}</>
                      ) : (
                        <>-</>
                      )
                    )}
                  </span>
                </div>
                <AmountInput
                  amount={amount}
                  onChange={setAmount}
                />
                <SubmitButton
                  amount={amount}
                  isAllowanceLoading={isAllowanceLoading}
                  isApproveRequired={isApproveRequired}
                  isPending={isPending}
                  isProcessing={isProcessing}
                  onClick={submit}
                />
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}
