import { useId } from 'react'
import { BoltMark } from './Glyphs'

type Props = {
  className?: string
  /** Mostra o anel de texto ao redor do selo (como no material impresso) */
  ring?: boolean
}

/**
 * Selo da marca: círculo preto, tipografia condensada branca e o raio
 * amarelo no lugar do "I" de DRINK — como aparece nos copos da Hype.
 */
export function HypeLogo({ className = '', ring = true }: Props) {
  const uid = useId().replace(/:/g, '')

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Hype Drink">
      <defs>
        <path
          id={`ring-${uid}`}
          d="M100 18 a82 82 0 1 1 -0.1 0"
          fill="none"
        />
      </defs>

      <circle cx="100" cy="100" r="98" fill="#050806" />
      <circle cx="100" cy="100" r="74" fill="none" stroke="#ffffff" strokeWidth="3" />
      <circle cx="100" cy="100" r="70" fill="#050806" />

      {ring && (
        <text
          fill="#ffffff"
          fontSize="13"
          fontWeight="700"
          letterSpacing="2.4"
          fontFamily="Figtree, system-ui, sans-serif"
        >
          <textPath href={`#ring-${uid}`} startOffset="0%">
            ENERGIA • SABOR • METABOLISMO • SAÚDE • ENERGIA • SABOR • METABOLISMO •
          </textPath>
        </text>
      )}

      <text
        x="100"
        y="93"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="Archivo, system-ui, sans-serif"
        fontSize="38"
        fontWeight="900"
        letterSpacing="-1"
      >
        HYPE
      </text>

      <g>
        <text x="92" y="136" textAnchor="end" fill="#ffffff" fontFamily="Archivo, system-ui, sans-serif" fontSize="38" fontWeight="900" letterSpacing="-1">
          DR
        </text>
        <BoltMark cx={100} cy={123} height={38} />
        <text x="108" y="136" textAnchor="start" fill="#ffffff" fontFamily="Archivo, system-ui, sans-serif" fontSize="38" fontWeight="900" letterSpacing="-1">
          NK
        </text>
      </g>
    </svg>
  )
}

/** Raio isolado — usado como micro-detalhe de marca na interface. */
export function Bolt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M13.8 2 5.5 13.4h5.2L9.3 22l8.6-11.8h-5.3L13.8 2z" />
    </svg>
  )
}
