type IconProps = { className?: string }

/** Glifo do Instagram (a lucide-react não traz mais ícones de marca). */
export function InstagramGlyph({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden>
      <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.4" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/**
 * Raio da marca desenhado dentro de um SVG maior — usado no lugar do "I"
 * de DRINK. Recebe o centro e a altura desejada em unidades do viewBox.
 */
export function BoltMark({ cx, cy, height }: { cx: number; cy: number; height: number }) {
  const s = height / 20
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s}) translate(-11.8 -12)`}>
      <path d="M13.8 2 5.5 13.4h5.2L9.3 22l8.6-11.8h-5.3L13.8 2z" fill="#FFC629" />
    </g>
  )
}
