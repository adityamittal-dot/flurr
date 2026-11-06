import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import Reveal from './Reveal'

const steps = [
  { title: 'Say hello', body: 'DM us the piece or colours you have in mind.' },
  { title: 'We hook it', body: 'It is crocheted by hand after you ask.' },
  { title: 'It comes home', body: 'Wrapped with its little flurr tag and sent your way.' },
]
const offsets = ['md:mt-0', 'md:mt-24', 'md:mt-48']

interface YarnProps { id: string; viewBox: string; d: string; progress: ReturnType<typeof useSpring>; className: string }

function Yarn({ id, viewBox, d, progress, className }: YarnProps) {
  return (
    <svg className={className} viewBox={viewBox} preserveAspectRatio="none" fill="none" aria-hidden="true">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="-50" y="-50" width="2000" height="2000">
          <motion.path d={d} stroke="white" strokeWidth="14" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: progress }} />
        </mask>
      </defs>
      <path
        d={d} mask={`url(#${id})`} stroke="var(--accent)" strokeWidth="5" strokeLinecap="round"
        strokeDasharray="10 12" vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export default function Ordering() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  const progress = reduce ? scrollYProgress : spring

  return (
    <section id="ordering" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal><h2 className="text-5xl font-extrabold md:text-7xl">How ordering works</h2></Reveal>
      <div ref={ref} className="relative mt-14">
        <Yarn
          id="yarn-wide" viewBox="0 0 1000 500" progress={progress}
          d="M 160 60 C 380 20, 260 280, 500 280 S 700 480, 840 460"
          className="pointer-events-none absolute inset-0 hidden size-full md:block"
        />
        <Yarn
          id="yarn-tall" viewBox="0 0 40 600" progress={progress}
          d="M 20 0 C 40 100, 0 200, 20 300 S 40 500, 20 600"
          className="pointer-events-none absolute top-0 left-0 h-full w-8 md:hidden"
        />
        <ol className="relative grid gap-8 pl-12 md:grid-cols-3 md:gap-8 md:pl-0">
          {steps.map((s, i) => (
            <li key={s.title} className={offsets[i]}>
              <Reveal delay={i * 0.08}>
                <div className="rounded-[28px] bg-surface p-7 shadow-soft">
                  <h3 className="font-display text-3xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="hidden md:block md:h-48" aria-hidden="true" />
      </div>
    </section>
  )
}
