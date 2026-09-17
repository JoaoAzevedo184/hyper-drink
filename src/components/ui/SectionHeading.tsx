import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ title, description, align = 'left', className = '' }: Props) {
  return (
    <div
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
    >
      <Reveal>
        <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-extrabold leading-[0.98] text-foam">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.08}>
          <p className="mt-5 text-base leading-relaxed text-foam/60 sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
