import { useRef, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { Product } from '../data/products'
import { categories } from '../data/products'
import { DrinkGlass } from './ui/DrinkGlass'
import { brl } from '../lib/format'

type Props = {
  product: Product
  onSelect: (product: Product) => void
}

export function ProductCard({ product, onSelect }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 220, damping: 20 })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 220, damping: 20 })

  const categoryLabel = categories.find((c) => c.id === product.category)?.label ?? ''

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const reset = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      ref={ref}
      layout
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -12, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      className="group glass relative flex flex-col overflow-hidden rounded-4xl p-4 transition-colors duration-500 hover:border-hype-300/40 sm:p-5"
    >
      {/* brilho que acompanha o hover */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-hype/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden />

      <div className="relative flex items-start justify-between gap-2">
        <span className="glass-green rounded-full px-3 py-1 text-[11px] font-semibold text-hype-300">
          {categoryLabel}
        </span>
        {product.badge && (
          <span className="rounded-full bg-[#FFC629] px-3 py-1 text-[11px] font-bold text-void">
            {product.badge}
          </span>
        )}
      </div>

      <div className="relative mx-auto my-3 w-[48%] max-w-[150px]">
        <motion.div
          whileHover={reduced ? undefined : { scale: 1.06, y: -8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          <DrinkGlass colors={product.liquid} ice={product.ice} className="w-full" />
        </motion.div>
      </div>

      <h3 className="text-lg font-bold leading-tight text-foam">{product.name}</h3>
      <p className="mt-1 text-sm leading-relaxed text-foam/55">{product.short}</p>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {product.benefits.map((b) => (
          <li key={b} className="rounded-full border border-hype-300/25 px-2.5 py-1 text-[11px] text-hype-300">
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div>
          <span className="block font-display text-xl font-black text-foam">{brl(product.price)}</span>
          <span className="text-xs text-foam/40">{product.size}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelect(product)}
            aria-label={`Adicionar ${product.name}`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-foam transition-all hover:bg-white/10 active:scale-95"
          >
            <Plus className="h-5 w-5" />
          </button>
          <button
            onClick={() => onSelect(product)}
            className="min-h-[44px] rounded-full bg-hype px-5 text-sm font-semibold text-white transition-all hover:bg-hype-400 active:scale-95"
          >
            Quero esse
          </button>
        </div>
      </div>
    </motion.div>
  )
}
