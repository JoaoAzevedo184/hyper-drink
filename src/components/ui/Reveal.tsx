import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  /** Revela com máscara vertical, usado em blocos visuais maiores */
  mask?: boolean
}

export function Reveal({ children, delay = 0, y = 26, className = '', mask = false }: Props) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={mask ? { clipPath: 'inset(0 0 100% 0)', opacity: 0 } : { opacity: 0, y }}
      whileInView={mask ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -10% 0px' }}
      transition={{ duration: mask ? 0.95 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
