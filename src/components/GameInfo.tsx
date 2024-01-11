import dayjs from 'dayjs'
import { type GameQuery } from '@azuro-org/sdk'


type ParticipantLogoProps = {
  image?: string | null
  name: string
}

function ParticipantLogo(props: ParticipantLogoProps) {
  const { image, name } = props

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full">
        {
          Boolean(image) && (
            <img className="w-12 h-12" src={image!} alt="" />
          )
        }
      </div>
      <span className="max-w-[210px] mt-3 text-lg text-center">{name}</span>
    </div>
  )
}

type Props = {
  game: GameQuery['games'][0]
}

export function GameInfo(props: Props) {
  const { sport, league, participants, startsAt } = props.game

  return (
    <div className="flex flex-col items-center pt-6 pb-8 bg-zinc-50 rounded-[40px]">
      <div className="flex flex-col items-center text-md">
        <div>{sport.name}</div>
        <div className="mt-2 text-zinc-500">
          {league.country.name} &middot; {league.name}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr]">
        <ParticipantLogo {...participants[0]} />
        <div className="mx-5 pt-7 text-md text-zinc-500">
          {dayjs(startsAt * 1000).format('DD MMM HH:mm')}
        </div>
        <ParticipantLogo {...participants[1]} />
      </div>
    </div>
  )
}
