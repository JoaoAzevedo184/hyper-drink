import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Bolt } from './ui/HypeLogo'

/** Loading inicial curto: o copo enche, a marca aparece, a cortina sobe. */
export function Preloader({ visible }: { visible: boolean }) {
  const reduced = useReducedMotion()

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
          exit={reduced ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: reduced ? 0.25 : 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-6 px-8">
            <motion.div
              className="flex items-center gap-2 text-foam"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-display text-2xl font-black tracking-tight">HYPE</span>
              <Bolt className="h-5 w-5 text-[#FFC629]" />
              <span className="font-display text-2xl font-black tracking-tight">DRINK</span>
            </motion.div>

            <div className="h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-hype to-hype-300"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: reduced ? 0.2 : 1.1, ease: 'easeInOut' }}
              />
            </div>

            <p className="text-xs text-foam/40">Servindo seu Hype…</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
