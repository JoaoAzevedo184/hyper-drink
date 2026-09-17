import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X, Minus, Plus, MessageCircle } from 'lucide-react'
import type { Product } from '../data/products'
import { DrinkGlass } from './ui/DrinkGlass'
import { brl } from '../lib/format'
import { orderMessage, whatsappUrl } from '../lib/whatsapp'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'

type Props = {
  product: Product | null
  onClose: () => void
}

/** Bottom sheet no celular, painel centralizado no desktop. */
export function ProductModal({ product, onClose }: Props) {
  const reduced = useReducedMotion()
  const [qty, setQty] = useState(1)
  useLockBodyScroll(Boolean(product))

  useEffect(() => {
    if (product) setQty(1)
  }, [product])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
          <motion.button
            className="absolute inset-0 bg-void/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Fechar"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            initial={reduced ? { opacity: 0 } : { y: '100%', opacity: 1 }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            drag={reduced ? false : 'y'}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => info.offset.y > 130 && onClose()}
            className="relative w-full max-w-lg rounded-t-[2rem] border-t border-white/10 bg-ink/95 p-5 pb-8 backdrop-blur-2xl sm:rounded-[2rem] sm:border sm:p-7"
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/15 sm:hidden" />

            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-foam/70 transition-colors hover:bg-white/10 hover:text-foam"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex gap-5">
              <div className="w-24 shrink-0 sm:w-32">
                <DrinkGlass colors={product.liquid} ice={product.ice} className="w-full" />
              </div>
              <div className="min-w-0 flex-1 pr-10">
                <h3 className="text-2xl font-black leading-tight text-foam">{product.name}</h3>
                <p className="mt-1 text-sm text-foam/55">{product.short}</p>
                <p className="mt-3 font-display text-2xl font-black text-hype-300">{brl(product.price)}</p>
                <p className="text-xs text-foam/40">Copo de {product.size}</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-semibold tracking-wide text-foam/40">Como é montado</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.ingredients.map((item) => (
                  <li key={item} className="glass rounded-full px-3.5 py-1.5 text-sm text-foam/80">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-3xl bg-white/5 p-3">
              <span className="pl-3 text-sm text-foam/60">Quantidade</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Diminuir quantidade"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-foam transition-colors hover:bg-white/10 disabled:opacity-40"
                  disabled={qty === 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-display text-lg font-black text-foam">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  aria-label="Aumentar quantidade"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-hype text-white transition-colors hover:bg-hype-400"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between px-4">
              <span className="text-sm text-foam/50">Total</span>
              <span className="font-display text-xl font-black text-foam">{brl(product.price * qty)}</span>
            </div>

            <a
              href={whatsappUrl(orderMessage(product.name, qty, product.price))}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full bg-hype px-6 text-base font-semibold text-white transition-all hover:bg-hype-400 active:scale-[0.98]"
            >
              <MessageCircle className="h-5 w-5" />
              Fazer pedido pelo WhatsApp
            </a>

            <p className="mt-3 text-center text-xs text-foam/35">
              Protótipo: o pedido abre uma conversa simulada, sem cobrança.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
