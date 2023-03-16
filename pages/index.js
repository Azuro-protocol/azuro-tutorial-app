import Link from 'next/link'
import dayjs from 'dayjs'
import useSportEvents from '@/hooks/useSportEvents'

const GameCard = ({ id, sport, league, participants, startsAt }) => (
  <Link
    className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
    href={`/games/${id}`}
  >
    <div className="flex justify-between text-sm">
      <span>{sport.name}</span>
      <span>{dayjs(startsAt * 1000).format('DD MMM HH:mm')}</span>
    </div>
    <div className="mt-2 text-sm text-gray-400">
      {league.country.name} &middot; {league.name}
    </div>
    <div className="mt-3 space-y-1">
      {
        participants.map(({ image, name }) => (
          <div key={name} className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 mr-2 border border-gray-300 rounded-full">
              <img className="w-4 h-4" src={image} alt={name} />
            </div>
            <span className="text-md">{name}</span>
          </div>
        ))
      }
    </div>
  </Link>
)

export default function Home() {
  const { loading, data } = useSportEvents()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {
          data.games.map((game) => (
            <GameCard key={game.id} {...game} />
          ))
        }
      </div>
    </main>
  )
}
