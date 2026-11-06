import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { List, X } from '@phosphor-icons/react'
import { DM_URL } from '../config'
import { LinkButton, ORDER_LABEL } from './Button'

const links = [
  { href: '#makes', label: 'the makes' },
  { href: '#ordering', label: 'ordering' },
  { href: '#custom', label: 'custom' },
  { href: '#about', label: 'about' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-3 z-40 px-3">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 rounded-full bg-surface/90 py-2 pr-2 pl-6 shadow-soft backdrop-blur"
      >
        <a href="#top" className="font-display text-2xl font-extrabold tracking-tight">flurr</a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-2.5 py-2 font-medium text-ink-soft transition hover:bg-ink/10 hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <LinkButton href={DM_URL} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 text-[0.95rem]">
            {ORDER_LABEL}
          </LinkButton>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full bg-ink/10 transition active:scale-[0.97] md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-50 flex flex-col bg-bg p-6 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-extrabold">flurr</span>
              <button
                type="button"
                className="grid size-10 place-items-center rounded-full bg-ink/10 active:scale-[0.97]"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={22} weight="bold" />
              </button>
            </div>
            <ul className="mt-10 flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-[28px] px-4 py-3 font-display text-4xl font-bold hover:bg-surface"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <LinkButton href={DM_URL} target="_blank" rel="noopener noreferrer" className="mt-auto">
              {ORDER_LABEL}
            </LinkButton>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
