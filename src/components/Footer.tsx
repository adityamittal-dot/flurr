import { InstagramLogo } from '@phosphor-icons/react'
import { INSTAGRAM_HANDLE, PROFILE_URL } from '../config'

export default function Footer() {
  return (
    <footer className="mt-12 overflow-hidden px-5 pt-12">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <div>
          <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full font-semibold underline underline-offset-4">
            <InstagramLogo size={22} weight="fill" /> @{INSTAGRAM_HANDLE}
          </a>
          <p className="mt-2 text-ink-soft">Ordering is a conversation on Instagram.</p>
        </div>
        <p className="text-sm text-ink-soft">&copy; {new Date().getFullYear()} flurr</p>
      </div>
      <p
        aria-hidden="true"
        className="mt-6 -mb-[0.12em] text-center font-display text-[min(46vw,40rem)] leading-[0.8] font-extrabold tracking-tighter text-moss select-none"
      >
        flurr
      </p>
    </footer>
  )
}
