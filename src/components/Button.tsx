import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'onMoss'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold leading-none whitespace-nowrap transition duration-150 active:scale-[0.97] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-on-accent hover:bg-[var(--accent-hover)] active:bg-[var(--accent-hover)]',
  secondary: 'border-2 border-ink/30 text-ink hover:bg-surface hover:border-ink/60 active:bg-ink/10',
  onMoss: 'border-2 border-on-moss/50 text-on-moss hover:bg-on-moss/15 active:bg-on-moss/25',
}

export function cx(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export function LinkButton({
  variant = 'primary', className, children, ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <a className={cx(base, variants[variant], className)} {...rest}>
      {children}
    </a>
  )
}

export function Button({
  variant = 'primary', className, children, ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <button className={cx(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  )
}

export const ORDER_LABEL = 'Order on Instagram'
