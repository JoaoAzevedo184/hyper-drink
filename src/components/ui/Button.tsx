import type { ReactNode } from 'react'

type Variant = 'primary' | 'glass' | 'light'
type Size = 'md' | 'lg'

type Props = {
  children: ReactNode
  variant?: Variant
  size?: Size
  href?: string
  onClick?: () => void
  className?: string
  icon?: ReactNode
  full?: boolean
  ariaLabel?: string
}

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-[transform,box-shadow,background-color] duration-300 active:scale-[0.97] select-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-hype text-white shadow-[0_18px_45px_-18px_rgba(7,148,71,0.95)] hover:bg-hype-400 hover:shadow-[0_22px_60px_-18px_rgba(34,201,111,0.9)] hover:-translate-y-0.5',
  glass:
    'glass text-foam hover:border-hype-300/50 hover:bg-white/10 hover:-translate-y-0.5',
  light:
    'bg-foam text-void hover:bg-white hover:-translate-y-0.5 shadow-[0_18px_45px_-22px_rgba(255,255,255,0.6)]',
}

const sizes: Record<Size, string> = {
  md: 'px-5 py-3 text-[0.95rem] min-h-[48px]',
  lg: 'px-7 py-4 text-base min-h-[56px]',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon,
  full,
  ariaLabel,
}: Props) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${full ? 'w-full' : ''} ${className}`

  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  )

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" aria-label={ariaLabel} onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
