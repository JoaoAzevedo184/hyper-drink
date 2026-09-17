import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from '../lib/whatsapp'
import { site } from '../data/site'

/** Botão flutuante de WhatsApp — aparece depois da Hero. */
export function WhatsAppFab() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={whatsappUrl(`Oi, Hype Drink! Quero fazer um pedido no ${site.place}.`)}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Pedir pelo WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-hype px-5 text-sm font-semibold text-white shadow-[0_18px_40px_-14px_rgba(7,148,71,0.9)] transition-colors hover:bg-hype-400"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">Pedir pelo WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
