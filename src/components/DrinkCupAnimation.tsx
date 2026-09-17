import { useId, useLayoutEffect, useMemo, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { BoltMark } from './ui/Glyphs'

type Props = {
  /** Dispara o enchimento (chamado quando o loading inicial termina) */
  start?: boolean
  className?: string
}

/** Gera a onda do líquido: duas oscilações por período, repetida ao longo do eixo X. */
function buildWave(amplitude: number, period: number, from: number, to: number, depth: number) {
  let d = `M ${from} 0`
  for (let x = from; x < to; x += period) {
    d += ` C ${x + period * 0.25} ${-amplitude}, ${x + period * 0.75} ${amplitude}, ${x + period} 0`
  }
  d += ` L ${to} ${depth} L ${from} ${depth} Z`
  return d
}

const CUP =
  'M84 112 L104 452 Q106 472 128 472 L232 472 Q254 472 256 452 L276 112 Z'

export function DrinkCupAnimation({ start = true, className = '' }: Props) {
  const uid = useId().replace(/:/g, '')
  const reduced = useReducedMotion()

  const scope = useRef<SVGSVGElement>(null)
  const liquid = useRef<SVGGElement>(null)
  const wave1 = useRef<SVGGElement>(null)
  const wave2 = useRef<SVGGElement>(null)
  const cup = useRef<SVGGElement>(null)
  const ripple = useRef<SVGEllipseElement>(null)

  const wave = useMemo(() => buildWave(10, 180, -360, 720, 520), [])
  const waveSoft = useMemo(() => buildWave(6, 240, -480, 720, 520), [])

  const bubbles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        cx: 112 + ((i * 47) % 130),
        r: 2.5 + ((i * 7) % 6),
        delay: (i % 6) * 0.42,
        duration: 2.6 + ((i * 3) % 5) * 0.32,
        drift: i % 2 === 0 ? 7 : -9,
      })),
    [],
  )

  useLayoutEffect(() => {
    if (reduced || !start) return

    const ctx = gsap.context(() => {
      gsap.set('.hype-liquid', { y: 360 })
      gsap.set('.hype-ripple', { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' })

      // ondulação contínua da superfície
      gsap.to(wave1.current, { x: -360, duration: 3.4, ease: 'none', repeat: -1 })
      gsap.to(wave2.current, { x: -480, duration: 5.6, ease: 'none', repeat: -1 })

      const tl = gsap.timeline({ delay: 0.25 })

      // 1. o líquido sobe
      tl.to('.hype-liquid', { y: 0, duration: 2.1, ease: 'power2.inOut' })
        // 2. respingo ao atingir o topo
        .to('.hype-ripple', { opacity: 0.5, scale: 1, duration: 0.5, ease: 'power2.out' }, '-=0.35')
        .to('.hype-ripple', { opacity: 0, duration: 0.5 }, '-=0.05')
        // 3. impacto do copo
        .to(
          cup.current,
          {
            keyframes: [
              { scaleY: 0.955, scaleX: 1.035, duration: 0.14, ease: 'power2.out' },
              { scaleY: 1.025, scaleX: 0.985, duration: 0.18 },
              { scaleY: 1, scaleX: 1, duration: 0.7, ease: 'elastic.out(1, 0.42)' },
            ],
            transformOrigin: '50% 100%',
          },
          '-=0.5',
        )

      // bolhas subindo dentro do líquido
      bubbles.forEach((b, i) => {
        gsap.fromTo(
          `.hype-bubble-${i}`,
          { y: 0, x: 0, opacity: 0 },
          {
            y: -(170 + (i % 5) * 42),
            x: b.drift,
            opacity: 0.85,
            duration: b.duration,
            delay: 1.5 + b.delay,
            ease: 'sine.out',
            repeat: -1,
            repeatDelay: 0.5,
            onRepeat: () => gsap.set(`.hype-bubble-${i}`, { opacity: 0 }),
          },
        )
      })
    }, scope)

    return () => ctx.revert()
  }, [reduced, start, bubbles])

  const settled = reduced || !start ? { opacity: 1, scale: 1, y: 0 } : undefined

  return (
    <div className={`relative ${className}`}>
      {/* brilho de fundo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(34,201,111,0.55), rgba(7,148,71,0) 68%)' }}
        aria-hidden
      />

      <svg
        ref={scope}
        viewBox="0 0 360 540"
        className="relative w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
        role="img"
        aria-label="Copo da Hype Drink sendo preenchido com a bebida"
        fill="none"
      >
        <defs>
          <linearGradient id={`w1-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6BE98F" />
            <stop offset="42%" stopColor="#22C96F" />
            <stop offset="100%" stopColor="#046B31" />
          </linearGradient>
          <linearGradient id={`w2-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C6FF8A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#079447" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.34" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.22" />
          </linearGradient>
          <clipPath id={`inner-${uid}`}>
            <path d={CUP} />
          </clipPath>
        </defs>

        <g ref={cup}>
          {/* líquido */}
          <g clipPath={`url(#inner-${uid})`}>
            <g className="hype-liquid" ref={liquid} style={reduced ? undefined : { transform: 'translateY(360px)' }}>
              <g transform="translate(0,170)">
                <g ref={wave2}>
                  <path d={waveSoft} fill={`url(#w2-${uid})`} opacity="0.55" />
                </g>
                <g ref={wave1}>
                  <path d={wave} fill={`url(#w1-${uid})`} />
                </g>
              </g>

              {/* gelo flutuando no líquido */}
              <motion.g
                initial={reduced ? false : { opacity: 0, y: 26 }}
                animate={settled ?? { opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <rect x="126" y="196" width="52" height="52" rx="14" fill="#fff" opacity="0.4" transform="rotate(-14 152 222)" />
                <rect x="186" y="238" width="42" height="42" rx="12" fill="#fff" opacity="0.3" transform="rotate(18 207 259)" />
                <rect x="142" y="292" width="38" height="38" rx="11" fill="#fff" opacity="0.22" transform="rotate(8 161 311)" />
              </motion.g>
            </g>

            {/* bolhas */}
            <g>
              {bubbles.map((b, i) => (
                <circle
                  key={i}
                  className={`hype-bubble-${i}`}
                  cx={b.cx}
                  cy={440}
                  r={b.r}
                  fill="#ffffff"
                  opacity={reduced ? 0.4 : 0}
                />
              ))}
            </g>

            <ellipse ref={ripple} className="hype-ripple" cx="180" cy="172" rx="86" ry="14" fill="#ffffff" opacity="0" />
          </g>

          {/* corpo do copo */}
          <path d={CUP} fill={`url(#body-${uid})`} stroke="rgba(255,255,255,0.55)" strokeWidth="3" />
          <path d="M104 150 L118 424" stroke="#fff" strokeOpacity="0.45" strokeWidth="9" strokeLinecap="round" />
          <path d="M246 178 L238 340" stroke="#fff" strokeOpacity="0.16" strokeWidth="6" strokeLinecap="round" />

          {/* tampa */}
          <path
            d="M74 78 h212 a10 10 0 0 1 10 10 v10 a14 14 0 0 1 -14 14 H78 a14 14 0 0 1 -14 -14 V88 a10 10 0 0 1 10 -10 z"
            fill="#ffffff"
            fillOpacity="0.28"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="3"
          />
          <ellipse cx="180" cy="72" rx="88" ry="16" fill="#ffffff" fillOpacity="0.18" stroke="rgba(255,255,255,0.55)" strokeWidth="3" />

          {/* selo da marca, revelado conforme o líquido sobe */}
          <motion.g
            initial={reduced ? false : { opacity: 0, scale: 0.86 }}
            animate={settled ?? { opacity: 1, scale: 1 }}
            transition={{ delay: 1.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: '180px 320px' }}
          >
            <circle cx="180" cy="320" r="64" fill="#050806" />
            <circle cx="180" cy="320" r="53" fill="none" stroke="#fff" strokeWidth="2.4" />
            <text x="180" y="312" textAnchor="middle" fill="#fff" fontFamily="Archivo, sans-serif" fontSize="27" fontWeight="900" letterSpacing="-0.8">
              HYPE
            </text>
            <text x="173" y="344" textAnchor="end" fill="#fff" fontFamily="Archivo, sans-serif" fontSize="27" fontWeight="900" letterSpacing="-0.8">
              DR
            </text>
            <BoltMark cx={180} cy={335} height={27} />
            <text x="187" y="344" textAnchor="start" fill="#fff" fontFamily="Archivo, sans-serif" fontSize="27" fontWeight="900" letterSpacing="-0.8">
              NK
            </text>
          </motion.g>

          {/* condensação */}
          <g opacity="0.5">
            <circle cx="124" cy="222" r="3" fill="#fff" opacity="0.5" />
            <circle cx="248" cy="270" r="2.4" fill="#fff" opacity="0.4" />
            <circle cx="134" cy="394" r="2.2" fill="#fff" opacity="0.35" />
          </g>
        </g>
      </svg>
    </div>
  )
}
