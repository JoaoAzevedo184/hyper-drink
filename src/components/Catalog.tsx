import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { categories, products, type Category, type Product } from '../data/products'
import { ProductCard } from './ProductCard'
import { ProductModal } from './ProductModal'
import { SectionHeading } from './ui/SectionHeading'
import { Bubbles } from './ui/Bubbles'

type Filter = 'todos' | Category

function CardSkeleton() {
  return (
    <div className="glass rounded-4xl p-5">
      <div className="h-5 w-20 rounded-full bg-white/10" />
      <div className="mx-auto my-6 h-40 w-24 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 bg-[length:200%_100%] animate-shimmer" />
      <div className="h-5 w-2/3 rounded-full bg-white/10" />
      <div className="mt-3 h-4 w-1/2 rounded-full bg-white/5" />
      <div className="mt-6 h-11 w-full rounded-full bg-white/5" />
    </div>
  )
}

export function Catalog() {
  const [filter, setFilter] = useState<Filter>('todos')
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Product | null>(null)

  const list = useMemo(
    () => (filter === 'todos' ? products : products.filter((p) => p.category === filter)),
    [filter],
  )

  // pequena transição entre filtros, como num app
  useEffect(() => {
    setLoading(true)
    const t = window.setTimeout(() => setLoading(false), 280)
    return () => window.clearTimeout(t)
  }, [filter])

  return (
    <section id="catalogo" className="relative overflow-hidden py-24 sm:py-32">
      <Bubbles count={8} opacity={0.25} />
      <div className="pointer-events-none absolute -right-20 top-40 h-[420px] w-[420px] rounded-full bg-hype/12 blur-[130px]" aria-hidden />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          title={
            <>
              Escolha seu <span className="text-hype-300">Hype</span>
            </>
          }
          description="Bebida funcional montada na hora, no copo Hype. Toque em um sabor para fazer o pedido."
        />

        {/* filtros — role para o lado no celular */}
        <div className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {categories.map((cat) => {
            const active = filter === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                aria-pressed={active}
                className={`relative shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                  active ? 'text-white' : 'text-foam/55 hover:text-foam'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-hype"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {!active && <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.04]" />}
                <span className="relative">{cat.label}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: Math.min(3, list.length || 3) }, (_, i) => <CardSkeleton key={i} />)
          ) : (
            <AnimatePresence mode="popLayout">
              {list.map((product) => (
                <ProductCard key={product.id} product={product} onSelect={setSelected} />
              ))}
            </AnimatePresence>
          )}
        </div>

        <p className="mt-8 text-center text-xs text-foam/30">
          Protótipo: confirme sabores e preços com a loja antes de publicar.
        </p>
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
