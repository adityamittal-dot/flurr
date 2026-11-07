import { InstagramLogo } from '@phosphor-icons/react'
import { INSTAGRAM_HANDLE, PROFILE_URL } from '../config'
import Braid from './Braid'

export default function Footer() {
  return (
    <footer className="mt-12 overflow-hidden">
      <Braid className="mb-12" />
      <div className="px-5">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <div>
          <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full font-semibold underline underline-offset-4">
            <InstagramLogo size={22} weight="fill" /> @{INSTAGRAM_HANDLE}
          </a>
          <p className="mt-2 text-ink-soft">Ordering is a conversation on Instagram.</p>
        </div>
        <p className="text-sm text-ink-soft">&copy; {new Date().getFullYear()} flurr</p>
      </div>
      <img src="logo.webp" alt="flurr by samiksha garg" width="1000" height="992" loading="lazy" className="mx-auto mt-12 mb-12 w-[min(78vw,26rem)]" />
      </div>
    </footer>
  )
}
