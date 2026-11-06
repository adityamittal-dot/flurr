import { useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import { yarn } from '../data/makes'
import Reveal from './Reveal'

const care = [
  { id: 'sun', title: 'Sunlight', body: 'Keep out of constant direct sun.' },
  { id: 'clean', title: 'Cleaning', body: 'Spot clean with a damp cloth and mild soap.' },
  { id: 'hold', title: 'Handling', body: 'Hold by the body, not the limbs or stems.' },
]

export default function About() {
  const [open, setOpen] = useState<string | null>('sun')
  return (
    <section id="about" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-16">
      <Reveal>
        <div className="mx-auto max-w-md overflow-hidden rounded-[28px] shadow-soft" style={{ aspectRatio: `${yarn.width} / ${yarn.height}` }}>
          <img src={yarn.src} alt={yarn.alt} width={yarn.width} height={yarn.height} loading="lazy" decoding="async" className="size-full object-cover" />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="text-5xl font-extrabold md:text-6xl">The hands behind flurr</h2>
        <p className="mt-5 text-lg text-ink-soft">flurr is made by samiksha garg, one stitch at a time.</p>
        {/* TODO: samiksha's own words */}

        <h3 className="mt-12 font-display text-2xl font-bold">Caring for your piece</h3>
        <div className="mt-4 divide-y divide-ink/15 rounded-[28px] bg-surface px-6 shadow-soft">
          {care.map((c) => {
            const isOpen = open === c.id
            return (
              <div key={c.id}>
                <h4>
                  <button
                    type="button" aria-expanded={isOpen} aria-controls={`care-${c.id}`}
                    onClick={() => setOpen(isOpen ? null : c.id)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left font-semibold"
                  >
                    {c.title}
                    <CaretDown size={18} weight="bold" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </h4>
                <div
                  id={`care-${c.id}`} role="region"
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 text-ink-soft">{c.body}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
