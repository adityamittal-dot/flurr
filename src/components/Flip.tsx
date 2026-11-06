import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { getMake, rapunzelBack } from '../data/makes'
import { useMediaQuery } from '../lib/useMediaQuery'
import Reveal from './Reveal'

const front = getMake('rapunzel')

const Copy = () => (
  <div className="max-w-md">
    <h2 className="text-5xl font-extrabold md:text-6xl">Every side gets the same attention.</h2>
    <p className="mt-5 text-lg text-ink-soft">The back of every piece is stitched as carefully as the front.</p>
  </div>
)

const faceStyle = { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as const
const ratio = (w: number, h: number) => ({ aspectRatio: `${w} / ${h}` })

function Pinned() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const rotateY = useTransform(scrollYProgress, [0.12, 0.88], [0, 180])
  return (
    <div ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 mx-auto grid h-dvh max-w-6xl grid-cols-2 items-center gap-10 px-5">
        <div className="justify-self-center" style={{ perspective: 1400 }}>
          <motion.div
            className="relative h-[min(72dvh,38rem)]"
            style={{ ...ratio(front.width, front.height), rotateY, transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[28px] shadow-soft" style={faceStyle}>
              <img src={front.src} alt={front.alt} width={front.width} height={front.height} loading="lazy" decoding="async" className="size-full object-cover" />
            </div>
            <div className="absolute inset-0 overflow-hidden rounded-[28px] shadow-soft" style={{ ...faceStyle, transform: 'rotateY(180deg)' }}>
              <img src={rapunzelBack.src} alt={rapunzelBack.alt} width={rapunzelBack.width} height={rapunzelBack.height} loading="lazy" decoding="async" className="size-full object-cover" />
            </div>
          </motion.div>
        </div>
        <Copy />
      </div>
    </div>
  )
}

function Static() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <Reveal><Copy /></Reveal>
      <div className="mt-10 grid grid-cols-2 gap-4 md:gap-8">
        {[{ s: front, w: front.width, h: front.height }, { s: rapunzelBack, w: rapunzelBack.width, h: rapunzelBack.height }].map(({ s, w, h }) => (
          <div key={s.src} className="overflow-hidden rounded-[28px] shadow-soft" style={ratio(w, h)}>
            <img src={s.src} alt={s.alt} width={w} height={h} loading="lazy" decoding="async" className="size-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Flip() {
  const reduce = useReducedMotion()
  const wide = useMediaQuery('(min-width: 768px)')
  return <section aria-label="Front and back of Rapunzel">{wide && !reduce ? <Pinned /> : <Static />}</section>
}
