import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, WhatsappLogo } from '@phosphor-icons/react'
import { DM_URL, hasWhatsApp, whatsappUrl } from '../config'
import { Button, LinkButton, cx } from './Button'
import Reveal from './Reveal'

const types = ['Plushie', 'Flowers', 'Accessory'] as const
const colours = [
  { name: 'Sunflower', hex: '#F6B916' },
  { name: 'Lilac', hex: '#B79AD9' },
  { name: 'Rose', hex: '#E8789A' },
  { name: 'Mint', hex: '#8FD6C2' },
  { name: 'Cobalt', hex: '#2C4FB5' },
  { name: 'Leaf', hex: '#2E8B3D' },
  { name: 'Cocoa', hex: '#6B4226' },
  { name: 'Cream', hex: '#F5EEDC' },
] as const

const MAX = 3
const list = (xs: string[]) =>
  xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`

function buildMessage(type: string | null, picked: string[], who: string): string {
  if (!type && picked.length === 0 && !who.trim()) {
    return "Hi flurr! I'd love a custom piece. Here is what I have in mind: "
  }
  const what = type ? `a custom ${type.toLowerCase()}` : 'a custom piece'
  const parts = [`Hi flurr! I'd love ${what}`]
  if (picked.length) parts.push(`in ${list(picked.map((p) => p.toLowerCase()))}`)
  let msg = parts.join(' ') + '.'
  if (who.trim()) msg += ` It is for ${who.trim()}.`
  return msg
}

export default function Custom() {
  const [type, setType] = useState<string | null>(null)
  const [picked, setPicked] = useState<string[]>([])
  const [who, setWho] = useState('')
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  const message = buildMessage(type, picked, who)

  const toggle = (name: string) =>
    setPicked((p) => (p.includes(name) ? p.filter((x) => x !== name) : p.length < MAX ? [...p, name] : p))

  const send = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
    window.open(DM_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="custom" className="px-3 py-12 md:px-5">
      <Reveal>
        <div className="on-moss mx-auto max-w-6xl stitched rounded-[28px] bg-moss p-6 text-on-moss sm:p-8 shadow-soft md:p-14">
          <h2 className="max-w-3xl text-4xl font-medium md:text-6xl">Want something that doesn't exist yet?</h2>
          <p className="mt-4 max-w-xl text-on-moss/85">Build your message here, then send it to us on Instagram.</p>

          <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="space-y-8">
              <fieldset>
                <legend className="mb-3 font-semibold">What would you like?</legend>
                <div className="flex flex-wrap gap-2">
                  {types.map((t) => (
                    <button
                      key={t} type="button" aria-pressed={type === t}
                      onClick={() => setType(type === t ? null : t)}
                      className={cx(
                        'rounded-full border-2 px-5 py-2.5 font-semibold transition active:scale-[0.97]',
                        type === t ? 'border-accent bg-accent text-on-accent' : 'border-on-moss/50 hover:bg-on-moss/15',
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 font-semibold">Pick up to {MAX} yarn colours</legend>
                <div className="grid grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-4">
                  {colours.map((c) => {
                    const on = picked.includes(c.name)
                    const locked = !on && picked.length >= MAX
                    return (
                      <div key={c.name} className="flex min-w-0 flex-col items-center gap-1.5">
                        <motion.button
                          type="button" aria-pressed={on} aria-label={c.name}
                          aria-disabled={locked || undefined}
                          onClick={() => !locked && toggle(c.name)}
                          animate={{ scale: on ? 1.12 : 1 }}
                          whileTap={{ scale: 0.93 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 16 }}
                          className={cx(
                            'grid size-11 place-items-center rounded-full border-2 sm:size-14',
                            on ? 'border-on-moss' : 'border-on-moss/30',
                            locked ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
                          )}
                          style={{ background: c.hex }}
                        >
                          {on && (
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 600, damping: 18 }}>
                              <Check size={22} weight="bold" color={c.name === 'Cobalt' || c.name === 'Leaf' || c.name === 'Cocoa' ? '#fff' : '#1F2B1D'} />
                            </motion.span>
                          )}
                        </motion.button>
                        <span className="text-xs sm:text-sm">{c.name}</span>
                      </div>
                    )
                  })}
                </div>
              </fieldset>

              <div>
                <label htmlFor="who" className="mb-3 block font-semibold">Who is it for? <span className="font-normal text-on-moss/75">(optional)</span></label>
                <textarea
                  id="who" rows={2} value={who} onChange={(e) => setWho(e.target.value)}
                  className="w-full rounded-[28px] border-2 border-on-moss/30 bg-black/20 px-5 py-3 text-on-moss placeholder:text-on-moss/60"
                  placeholder="My sister, who loves sunflowers"
                />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="rounded-[28px] bg-black/20 p-6">
                <p className="mb-2 font-semibold">Your message</p>
                <p aria-live="polite" className="whitespace-pre-wrap text-lg">{message}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={send}>Copy message and open Instagram</Button>
                {hasWhatsApp && (
                  <LinkButton href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" variant="onMoss">
                    <WhatsappLogo size={20} weight="fill" /> Send on WhatsApp
                  </LinkButton>
                )}
              </div>
              <div aria-live="polite" className="min-h-6 text-sm">
                <AnimatePresence mode="wait">
                  {status === 'copied' && (
                    <motion.p key="c" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 font-semibold">
                      <Check size={16} weight="bold" /> Copied. Paste it into the chat.
                    </motion.p>
                  )}
                  {status === 'failed' && (
                    <motion.p key="f" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      We couldn't copy it for you. Select the message above, copy it, then paste it into the chat.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
