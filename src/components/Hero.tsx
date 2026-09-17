import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { MapPin, ChevronDown } from 'lucide-react'
import { DrinkCupAnimation } from './DrinkCupAnimation'
import { Bubbles } from './ui/Bubbles'
import { Button } from './ui/Button'
import { Bolt } from './ui/HypeLogo'
import { site } from '../data/site'
import { scrollToSection } from '../hooks/useSmoothScroll'
import { whatsappUrl } from '../lib/whatsapp'

export function Hero({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const cupY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90])
    const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])

  const enter = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section id="top" ref={ref} className="relative isolate grain overflow-hidden pb-14 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
      {/* atmosfera: manchas de líquido e luz */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-hype/25 blur-[130px]" />
        <div className="absolute -right-32 top-32 h-[460px] w-[460px] rounded-full bg-hype-400/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-[320px] w-[760px] -translate-x-1/2 rounded-[50%] bg-hype-900/60 blur-[100px]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.10]" aria-hidden>
          <defs>
            <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M56 0H0v56" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <Bubbles count={12} opacity={0.35} />

      <div className="mx-auto flex max-w-6xl flex-col px-5 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-6">
        {/* bloco superior */}
        <div className="relative z-10 text-center lg:col-start-1 lg:row-start-1 lg:text-left">
          <motion.div
            {...enter(0.1)}
            className="glass-green mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-hype-300 lg:mx-0"
          >
            <MapPin className="h-3.5 w-3.5" />
            {site.place}
          </motion.div>

          <motion.div {...enter(0.18)} className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
            <span className="font-display text-xs font-black tracking-[0.35em] text-foam/70 sm:text-sm">HYPE</span>
            <Bolt className="h-3.5 w-3.5 text-[#FFC629]" />
            <span className="font-display text-xs font-black tracking-[0.35em] text-foam/70 sm:text-sm">DRINK</span>
          </motion.div>

          <motion.h1
            {...enter(0.26)}
            className="mt-3 text-[clamp(2.3rem,8.4vw,5.2rem)] font-black leading-[0.94] text-foam text-glow"
          >
            Seu momento.
            <br />
            Seu sabor.
            <br />
            <span className="text-hype-300">Seu Hype.</span>
          </motion.h1>
        </div>

        {/* o copo — o momento principal da página */}
        <motion.div
          style={{ y: cupY }}
          className="relative -mt-2 w-full lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:-mt-0"
        >
          <span
            className="pointer-events-none absolute left-1/2 top-[14%] -z-10 -translate-x-1/2 font-display text-[30vw] font-black leading-none text-white/[0.05] lg:text-[13vw]"
            aria-hidden
          >
            HYPE
          </span>
          <DrinkCupAnimation start={ready} className="mx-auto w-[62%] max-w-[300px] sm:w-[46%] lg:w-[78%] lg:max-w-none" />
        </motion.div>

        {/* bloco inferior */}
        <motion.div
          style={{ opacity: fade }}
          className="relative z-10 -mt-4 text-center lg:col-start-1 lg:row-start-2 lg:mt-8 lg:text-left"
        >
          <motion.p
            {...enter(0.34)}
            className="mx-auto max-w-md text-base leading-relaxed text-foam/60 sm:text-lg lg:mx-0"
          >
            Conheça os sabores da Hype Drink no {site.place}.
          </motion.p>

          <motion.div
            {...enter(0.42)}
            className="mt-7 flex flex-col items-stretch gap-3 sm:mx-auto sm:max-w-md sm:flex-row sm:justify-center lg:mx-0 lg:justify-start"
          >
            <Button size="lg" onClick={() => scrollToSection('#catalogo')}>
              Ver sabores
            </Button>
            <Button
              size="lg"
              variant="glass"
              href={whatsappUrl(`Oi, Hype Drink! Quero fazer um pedido no ${site.place}.`)}
            >
              Fazer pedido
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToSection('#hype')}
        initial={reduced ? false : { opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 2.6, duration: 0.8 }}
        className="mx-auto mt-10 flex flex-col items-center gap-1.5 text-xs text-foam/40 transition-colors hover:text-foam/70"
        aria-label="Descer para a próxima seção"
      >
        Deslize
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.button>
    </section>
  )
}
