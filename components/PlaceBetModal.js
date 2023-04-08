import dayjs from 'dayjs'
import { getMarketName } from '@azuro-org/dictionaries'
import dictionaries from '@/dictionaries'
import usePlaceBet from '@/hooks/usePlaceBet'

const GameInfo = ({ game }) => (
  <div className="py-4 px-6 rounded-b-xl shadow-xl">
    <div className="flex justify-between text-md">
      <span>{game.sport.name}</span>
      <span>{dayjs(game.startsAt * 1000).format('DD MMM HH:mm')}</span>
    </div>
    <div className="mt-1 text-md text-gray-400">
      {game.league.country.name} &middot; {game.league.name}
    </div>
    <div className="mt-3 space-y-2">
      {
        game.participants.map(({ image, name }) => (
          <div key={name} className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 mr-2 border border-gray-300 rounded-full">
              <img className="w-4 h-4" src={image} alt={name} />
            </div>
            <span className="text-md">{name}</span>
          </div>
        ))
      }
    </div>
  </div>
)

const OutcomeInfo = ({ outcome }) => {
  const marketName = getMarketName({ outcomeId: outcome.outcomeId, dictionaries })

  return (
    <div className="grid grid-cols-[auto_1fr] gap-y-3 mt-2 text-md">
      <span className="text-gray-400">Market</span>
      <span className="text-right font-semibold">{marketName}</span>
      <span className="text-gray-400">Selection</span>
      <span className="text-right font-semibold">{outcome.selectionName}</span>
      <span className="text-gray-400">Odds</span>
      <span className="text-right font-semibold">{outcome.odds}</span>
    </div>
  )
}

const PlaceBetModal = ({ game, outcome, closeModal }) => {
  const {
    isRightChain,
    balance,
    amount,
    setAmount,
    isAllowanceFetching,
    isApproveRequired,
    approve,
    isApproving,
    placeBet,
  } = usePlaceBet({ outcome, onBetPlace: closeModal })

  const amountsNode = (
    <div className="mt-4 pt-4 border-t border-gray-300 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-md text-gray-400">Wallet balance</span>
        <span className="text-md font-semibold">-</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-md text-gray-400">Bet amount</span>
        <input
          className="w-[121px] py-2 px-4 border border-gray-400 text-md text-right font-semibold rounded-md"
          type="number"
          placeholder="Bet amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
    </div>
  )

  const button = !isRightChain ? (
    <div className="mt-6 py-2.5 text-center bg-red-200 rounded-md">
      Switch network in your wallet to <b>Polygon</b>
    </div>
  ) : (
    <button
      className="button w-full mt-6 py-2.5 text-center"
      disabled={isAllowanceFetching || isApproving}
      onClick={isApproveRequired ? approve : placeBet}
    >
      {
        isApproveRequired ? (
          isApproving ? 'Approving...' : 'Approve'
        ) : (
          'Place bet'
        )
      }
    </button>
  )

  return (
    <div
      className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-20"
      onClick={closeModal}
    >
      <div
        className="w-[400px] bg-white overflow-hidden rounded-xl shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <GameInfo game={game} />
        <div className="pt-4 px-6 pb-6">
          <OutcomeInfo outcome={outcome} />
          {amountsNode}
          {button}
        </div>
      </div>
    </div>
  )
}

export default PlaceBetModal
