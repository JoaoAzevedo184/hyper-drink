import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, MapPin } from 'lucide-react'
import { navLinks, site } from '../data/site'
import { scrollToSection } from '../hooks/useSmoothScroll'
import { whatsappUrl } from '../lib/whatsapp'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { Bolt } from './ui/HypeLogo'
import { Button } from './ui/Button'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useLockBodyScroll(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    window.setTimeout(() => scrollToSection(href), open ? 260 : 0)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="mx-auto max-w-6xl px-4">
          <div
            className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${
              scrolled ? 'glass shadow-card' : 'border border-transparent'
            }`}
          >
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center gap-1.5 font-display text-lg font-black tracking-tight text-foam"
            >
              HYPE
              <Bolt className="h-4 w-4 text-[#FFC629]" />
              DRINK
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="rounded-full px-4 py-2 text-sm text-foam/70 transition-colors hover:bg-white/5 hover:text-foam"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl('Oi, Hype Drink! Quero fazer um pedido.')}
                target="_blank"
                rel="noreferrer noopener"
                className="hidden rounded-full bg-hype px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-hype-400 hover:-translate-y-0.5 sm:inline-flex"
              >
                Fazer pedido
              </a>
              <button
                onClick={() => setOpen(true)}
                aria-label="Abrir menu"
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-foam md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-void/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-full flex-col px-6 pb-10 pt-6">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-display text-lg font-black text-foam">
                  HYPE
                  <Bolt className="h-4 w-4 text-[#FFC629]" />
                  DRINK
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-foam"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-12 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    onClick={() => go(link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                    className="border-b border-white/5 py-5 text-left font-display text-3xl font-black text-foam"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="mt-auto space-y-4">
                <p className="flex items-center gap-2 text-sm text-foam/50">
                  <MapPin className="h-4 w-4 text-hype-300" />
                  {site.place} • {site.store}
                </p>
                <Button
                  href={whatsappUrl('Oi, Hype Drink! Quero fazer um pedido.')}
                  size="lg"
                  full
                >
                  Fazer pedido
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
