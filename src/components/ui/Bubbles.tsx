import { useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'

type Props = {
  count?: number
  className?: string
  opacity?: number
}

/** Bolhas lentas de fundo — sobem devagar, sem competir com o conteúdo. */
export function Bubbles({ count = 14, className = '', opacity = 0.5 }: Props) {
  const reduced = useReducedMotion()

  const bubbles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 97) % 100
        return {
          left: `${(seed * 1.03) % 100}%`,
          size: 6 + ((i * 13) % 26),
          duration: 16 + ((i * 7) % 18),
          delay: -((i * 5) % 20),
        }
      }),
    [count],
  )

  if (reduced) return null

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-[-10%] rounded-full animate-rise"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            opacity,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            background:
              'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.75), rgba(77,224,138,0.28) 45%, rgba(7,148,71,0.05) 70%)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        />
      ))}
    </div>
  )
}
