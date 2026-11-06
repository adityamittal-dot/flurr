import { Fragment } from 'react'
import { FlowerLotus } from '@phosphor-icons/react'
import { makes } from '../data/makes'

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {makes.map((m) => (
        <Fragment key={m.id}>
          <li className="px-6 font-display text-4xl font-extrabold whitespace-nowrap text-on-accent md:text-6xl">
            {m.name}
          </li>
          <li className="px-2 text-on-accent" aria-hidden="true">
            <FlowerLotus size={44} weight="fill" />
          </li>
        </Fragment>
      ))}
    </ul>
  )
}

export default function Marquee() {
  return (
    <div className="overflow-hidden py-10" aria-label="Pieces from the flurr shop">
      <div className="-mx-6 -rotate-2 bg-accent py-5 shadow-soft">
        <div className="marquee-track flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </div>
  )
}
