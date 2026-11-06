import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { WhatsappLogo, X } from '@phosphor-icons/react'
import { DM_URL, hasWhatsApp, whatsappUrl } from '../config'
import { makes } from '../data/makes'
import type { Category, Make } from '../data/makes'
import { LinkButton, ORDER_LABEL, cx } from './Button'
import Reveal from './Reveal'

type Filter = 'all' | Category
const filters: Array<{ id: Filter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'plushie', label: 'Plushies' },
  { id: 'flowers', label: 'Flowers' },
  { id: 'accessories', label: 'Accessories' },
]

function Photo({ make, eager }: { make: Make; eager?: boolean }) {
  return (
    <img
      src={make.src}
      alt={make.alt}
      width={make.width}
      height={make.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className="size-full object-cover"
    />
  )
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

function useDialogBehavior(
  open: boolean,
  panel: React.RefObject<HTMLDivElement | null>,
  onClose: () => void,
  opener: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return
    const trigger = opener.current
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = panel.current?.querySelector<HTMLElement>(FOCUSABLE)
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
      if (e.key !== 'Tab' || !panel.current) return
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return
      const a = items[0]
      const b = items[items.length - 1]
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); b.focus() }
      else if (!e.shiftKey && document.activeElement === b) { e.preventDefault(); a.focus() }
      else if (!panel.current.contains(document.activeElement)) { e.preventDefault(); a.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      trigger?.focus()
    }
  }, [open, panel, onClose, opener])
}

function Dialog({ make, onClose, panelRef }: { make: Make; onClose: () => void; panelRef: React.RefObject<HTMLDivElement | null> }) {
  const message = `Hi flurr! I'd love to order ${make.name}.`
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        className="absolute inset-0 bg-[rgb(12_18_11/0.65)]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="make-title"
        className="relative grid max-h-[92dvh] w-full max-w-3xl gap-6 overflow-y-auto rounded-[28px] bg-surface p-4 shadow-soft md:grid-cols-[1fr_1fr] md:p-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          layoutId={`photo-${make.id}`}
          className="mx-auto w-full max-w-sm self-start overflow-hidden"
          style={{ aspectRatio: `${make.width} / ${make.height}`, borderRadius: 28, maxHeight: '70dvh' }}
        >
          <Photo make={make} eager />
        </motion.div>
        <div className="flex flex-col justify-center gap-4 pb-2 md:pr-4">
          <h3 id="make-title" className="font-display text-4xl font-extrabold">{make.name}</h3>
          <p className="text-ink-soft">{make.description}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <LinkButton href={DM_URL} target="_blank" rel="noopener noreferrer">{ORDER_LABEL}</LinkButton>
            {hasWhatsApp && (
              <LinkButton href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" variant="secondary">
                <WhatsappLogo size={20} weight="fill" /> Order on WhatsApp
              </LinkButton>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-bg/90 text-ink transition active:scale-[0.97] hover:bg-bg"
        >
          <X size={20} weight="bold" />
        </button>
      </motion.div>
    </div>
  )
}

export default function Makes() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Make | null>(null)
  const opener = useRef<HTMLElement | null>(null)
  const panel = useRef<HTMLDivElement | null>(null)
  const close = useRef(() => setSelected(null)).current

  useDialogBehavior(selected !== null, panel, close, opener)

  const shown = filter === 'all' ? makes : makes.filter((m) => m.category === filter)

  return (
    <section id="makes" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <h2 className="text-5xl font-extrabold md:text-7xl">Meet the makes</h2>
      </Reveal>

      <div role="group" aria-label="Filter the makes" className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = filter === f.id
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={cx(
                'relative rounded-full px-5 py-2.5 font-semibold transition active:scale-[0.97]',
                active ? 'text-on-moss' : 'bg-surface text-ink hover:bg-ink/10',
              )}
            >
              {active && (
                <motion.span
                  layoutId="filter-indicator"
                  className="absolute inset-0 rounded-full bg-moss"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          )
        })}
      </div>

      <LayoutGroup>
        <ul className="mt-10 columns-2 gap-4 md:columns-3 md:gap-6">
          <AnimatePresence mode="popLayout">
            {shown.map((m, i) => (
              <motion.li
                key={m.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={cx('mb-6 break-inside-avoid', i % 3 === 1 && 'md:mt-10')}
              >
                <button
                  type="button"
                  onClick={(e) => { opener.current = e.currentTarget; setSelected(m) }}
                  className="group block w-full cursor-pointer rounded-[28px] text-left"
                >
                  <motion.div
                    layoutId={`photo-${m.id}`}
                    className="overflow-hidden bg-surface shadow-soft"
                    style={{ aspectRatio: `${m.width} / ${m.height}`, borderRadius: 28 }}
                  >
                    <div className="size-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                      <Photo make={m} />
                    </div>
                  </motion.div>
                  <span className="mt-3 block px-2 font-display text-xl font-bold">{m.name}</span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </LayoutGroup>

      <AnimatePresence>
        {selected && <Dialog key="dialog" make={selected} onClose={close} panelRef={panel} />}
      </AnimatePresence>
    </section>
  )
}
