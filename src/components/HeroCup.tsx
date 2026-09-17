import { useId, useLayoutEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import cupPhoto from '../assets/cup.webp'

type Props = {
  start?: boolean
  className?: string
}

/** Onda usada como máscara do preenchimento. */
function buildWave(amplitude: number, period: number, from: number, to: number, depth: number) {
  let d = `M ${from} 0`
  for (let x = from; x < to; x += period) {
    d += ` C ${x + period * 0.25} ${-amplitude}, ${x + period * 0.75} ${amplitude}, ${x + period} 0`
  }
  return `${d} L ${to} ${depth} L ${from} ${depth} Z`
}

/**
 * O copo real da Hype Drink. A foto entra duas vezes: uma versão escura
 * (copo "vazio") e a versão colorida revelada de baixo para cima por uma
 * máscara em onda — é o líquido enchendo, agora sobre a foto de verdade.
 */
export function HeroCup({ start = true, className = '' }: Props) {
  const uid = useId().replace(/:/g, '')
  const reduced = useReducedMotion()
  const scope = useRef<HTMLDivElement>(null)

  const wave = useMemo(() => buildWave(14, 240, -480, 960, 1400), [])

  useLayoutEffect(() => {
    if (reduced || !start) return

    const ctx = gsap.context(() => {
      gsap.set('.cup-fill', { y: 980 })

      gsap.to('.wave-a', { x: -480, duration: 4.2, ease: 'none', repeat: -1 })

      const tl = gsap.timeline({ delay: 0.3 })
      tl.to('.cup-fill', { y: 0, duration: 2.3, ease: 'power2.inOut' })
        .to(
          '.cup-wrap',
          {
            keyframes: [
              { scaleY: 0.97, scaleX: 1.025, duration: 0.14, ease: 'power2.out' },
              { scaleY: 1.015, scaleX: 0.99, duration: 0.18 },
              { scaleY: 1, scaleX: 1, duration: 0.8, ease: 'elastic.out(1, 0.4)' },
            ],
            transformOrigin: '50% 92%',
          },
          '-=0.45',
        )
    }, scope)

    return () => ctx.revert()
  }, [reduced, start])

  return (
    <div ref={scope} className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(34,201,111,0.32), rgba(7,148,71,0) 70%)' }}
        aria-hidden
      />

      <div className="cup-wrap relative">
        <svg viewBox="0 0 584 852" className="w-full" role="img" aria-label="Copo da Hype Drink enchendo">
          <defs>
            {/* máscara (e não clipPath: grupos dentro de clipPath são ignorados) */}
            <mask id={`fill-${uid}`}>
              <g className="cup-fill">
                <g transform="translate(0,150)">
                  <g className="wave-a">
                    <path d={wave} fill="#fff" />
                  </g>
                </g>
              </g>
            </mask>
          </defs>

          {/* copo "vazio": a mesma foto, apagada */}
          <image
            href={cupPhoto}
            width="584"
            height="852"
            style={{ filter: 'brightness(0.32) saturate(0.25)' }}
          />

          {/* bebida: a foto em cor cheia, revelada pela onda */}
          <g mask={reduced ? undefined : `url(#fill-${uid})`}>
            <image href={cupPhoto} width="584" height="852" />
          </g>

        </svg>
      </div>
    </div>
  )
}
