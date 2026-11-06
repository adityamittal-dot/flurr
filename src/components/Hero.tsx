import { useRef } from 'react'
import {
  motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform,
} from 'motion/react'
import type { MotionValue } from 'motion/react'
import { DM_URL } from '../config'
import { getMake } from '../data/makes'
import type { Make } from '../data/makes'
import { EASE } from './Reveal'
import { LinkButton, ORDER_LABEL } from './Button'

interface PieceProps {
  make: Make
  className: string
  rotate: number
  delay: number
  y: MotionValue<number> | undefined
  reduce: boolean
}

function Piece({ make, className, rotate, delay, y, reduce }: PieceProps) {
  return (
    <motion.div className={`absolute ${className}`} style={reduce ? undefined : { y }}>
      <motion.div
        initial={reduce ? { rotate } : { opacity: 0, y: 60, scale: 0.88, rotate: rotate + 8 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate }}
        transition={{ type: 'spring', stiffness: 90, damping: 14, delay }}
        className="overflow-hidden rounded-[28px] bg-surface shadow-soft"
        style={{ aspectRatio: `${make.width} / ${make.height}` }}
      >
        <img
          src={make.src}
          alt={make.alt}
          width={make.width}
          height={make.height}
          decoding="async"
          className="size-full object-cover"
        />
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion() ?? false
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yBig = useTransform(scrollYProgress, [0, 1], [0, -50])
  const ySmall = useTransform(scrollYProgress, [0, 1], [0, -110])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -80])

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 })
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 })

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { px.set(0); py.set(0) }

  return (
    <section
      id="top"
      ref={ref}
      className="mx-auto grid min-h-dvh max-w-6xl items-center gap-8 px-5 pt-10 pb-12 lg:grid-cols-[1.25fr_1fr] lg:gap-6 lg:pt-4"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <h1 className="text-[clamp(2.9rem,6vw,4.75rem)] font-extrabold">
          Made with love, one stitch at a time.
        </h1>
        <p className="mt-6 max-w-md text-lg text-ink-soft">
          Handmade crochet plushies and flowers by samiksha garg. Tell us what you love and we'll make it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href={DM_URL} target="_blank" rel="noopener noreferrer">{ORDER_LABEL}</LinkButton>
          <LinkButton href="#makes" variant="secondary">See the makes</LinkButton>
        </div>
      </motion.div>

      <div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="mx-auto aspect-[5/6] w-full max-w-[26rem] lg:h-[min(74dvh,36rem)] lg:w-auto lg:max-w-none"
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="relative size-full"
          style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        >
          <Piece make={getMake('gigi')} className="top-[6%] left-0 w-[64%]" rotate={-4} delay={0.1} y={yBig} reduce={reduce} />
          <Piece make={getMake('sunny')} className="top-0 right-0 w-[40%]" rotate={6} delay={0.25} y={ySmall} reduce={reduce} />
          <Piece make={getMake('tortoise')} className="right-[2%] bottom-[2%] w-[42%]" rotate={-7} delay={0.4} y={yMid} reduce={reduce} />
        </motion.div>
      </div>
    </section>
  )
}
