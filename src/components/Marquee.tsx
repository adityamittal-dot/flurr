import { Fragment } from 'react'
import { makes } from '../data/makes'
import Braid from './Braid'

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {makes.map((m) => (
        <Fragment key={m.id}>
          <li className="px-6 font-display text-4xl font-medium whitespace-nowrap text-white md:text-6xl">
            {m.name}
          </li>
          <li className="shrink-0 px-2" aria-hidden="true">
            <img src="yarn-ball.webp" alt="" width="360" height="269" loading="lazy" className="h-11 w-auto" />
          </li>
        </Fragment>
      ))}
    </ul>
  )
}

export default function Marquee() {
  return (
    <div className="overflow-hidden py-10" aria-label="Pieces from the flurr shop">
      <div className="-mx-6 -rotate-2 shadow-soft">
        <Braid className="relative z-10 -mb-1.5" />
        <div className="bg-sage py-5">
        <div className="marquee-track flex w-max">
          <Row />
          <Row hidden />
        </div>
        </div>
        <Braid className="relative z-10 -mt-1.5" />
      </div>
    </div>
  )
}
