import { useId } from 'react'
import { BoltMark } from './Glyphs'

type Props = {
  colors: [string, string]
  ice?: boolean
  className?: string
  /** 0 a 1 — quanto do copo está cheio */
  fill?: number
  /** Selo da marca aplicado no copo */
  badge?: boolean
}

/**
 * Ilustração vetorial do copo Hype Drink (copo plástico com tampa e o selo
 * preto da marca), usada nos cards e no modal. Tudo em SVG: sem imagens
 * externas, nítido em qualquer tela e colorido a partir do produto.
 */
export function DrinkGlass({ colors, ice = false, className = '', fill = 0.82, badge = true }: Props) {
  const uid = useId().replace(/:/g, '')
  const [top, bottom] = colors
  const liquidTop = 70 + (1 - fill) * 170
  const cupPath = 'M50 66 L64 268 Q66 282 82 282 L118 282 Q134 282 136 268 L150 66 Z'

  return (
    <svg viewBox="44 20 112 278" className={className} role="img" aria-label="Copo Hype Drink" fill="none">
      <defs>
        <linearGradient id={`liq-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={top} />
          <stop offset="100%" stopColor={bottom} />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="48%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id={`halo-${uid}`} cx="50%" cy="58%" r="52%">
          <stop offset="0%" stopColor={top} stopOpacity="0.45" />
          <stop offset="100%" stopColor={top} stopOpacity="0" />
        </radialGradient>
        <clipPath id={`cup-${uid}`}>
          <path d={cupPath} />
        </clipPath>
      </defs>

      <ellipse cx="100" cy="180" rx="88" ry="112" fill={`url(#halo-${uid})`} />

      {/* líquido */}
      <g clipPath={`url(#cup-${uid})`}>
        <rect x="40" y={liquidTop} width="120" height="240" fill={`url(#liq-${uid})`} />
        <ellipse cx="100" cy={liquidTop} rx="52" ry="7" fill="#ffffff" opacity="0.25" />
        <circle cx="80" cy={liquidTop + 70} r="5" fill="#fff" opacity="0.26" />
        <circle cx="118" cy={liquidTop + 112} r="3.5" fill="#fff" opacity="0.2" />
        {ice && (
          <g>
            <rect x="70" y={liquidTop + 16} width="34" height="34" rx="9" fill="#fff" opacity="0.4" transform={`rotate(-14 87 ${liquidTop + 33})`} />
            <rect x="103" y={liquidTop + 52} width="28" height="28" rx="8" fill="#fff" opacity="0.3" transform={`rotate(20 117 ${liquidTop + 66})`} />
          </g>
        )}
      </g>

      {/* corpo do copo */}
      <path d={cupPath} fill={`url(#glass-${uid})`} stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
      <path d="M66 96 L74 252" stroke="#fff" strokeOpacity="0.45" strokeWidth="6" strokeLinecap="round" />
      <path d="M132 112 L128 208" stroke="#fff" strokeOpacity="0.18" strokeWidth="4" strokeLinecap="round" />

      {/* tampa */}
      <path d="M44 46 h112 a6 6 0 0 1 6 6 v6 a8 8 0 0 1 -8 8 H46 a8 8 0 0 1 -8 -8 v-6 a6 6 0 0 1 6 -6 z" fill="#ffffff" opacity="0.32" />
      <path d="M44 46 h112 a6 6 0 0 1 6 6 v6 a8 8 0 0 1 -8 8 H46 a8 8 0 0 1 -8 -8 v-6 a6 6 0 0 1 6 -6 z" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" />
      <ellipse cx="100" cy="42" rx="46" ry="9" fill="#ffffff" opacity="0.2" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />

      {/* selo da marca no copo */}
      {badge && (
        <g>
          <circle cx="100" cy="196" r="34" fill="#050806" />
          <circle cx="100" cy="196" r="28" fill="none" stroke="#fff" strokeWidth="1.5" />
          <text x="100" y="193" textAnchor="middle" fill="#fff" fontFamily="Archivo, sans-serif" fontSize="15" fontWeight="900" letterSpacing="-0.3">HYPE</text>
          <text x="96" y="210" textAnchor="end" fill="#fff" fontFamily="Archivo, sans-serif" fontSize="15" fontWeight="900" letterSpacing="-0.3">DR</text>
          <BoltMark cx={100} cy={205} height={15} />
          <text x="104" y="210" textAnchor="start" fill="#fff" fontFamily="Archivo, sans-serif" fontSize="15" fontWeight="900" letterSpacing="-0.3">NK</text>
        </g>
      )}
    </svg>
  )
}
