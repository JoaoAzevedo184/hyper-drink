import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { HeroCup } from './HeroCup'
import { Bubbles } from './ui/Bubbles'
import { Button } from './ui/Button'
import { HypeLogo } from './ui/HypeLogo'
import { site } from '../data/site'
import { scrollToSection } from '../hooks/useSmoothScroll'
import { whatsappUrl } from '../lib/whatsapp'

const word = 'font-display font-extrabold uppercase leading-[0.86] tracking-[-0.03em] text-foam'

export function Hero({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const cupY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140])
  const cupScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12])
  const leftX = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -90])
  const rightX = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90])

  const enter = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden">
      {/* atmosfera */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/2 top-[38%] h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hype/20 blur-[140px]" />
        <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-hype-900/70 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[520px] rounded-full bg-hype-700/25 blur-[130px]" />
      </div>
      <Bubbles count={10} opacity={0.3} />

      {/* moldura de cantos */}
      <div className="pointer-events-none absolute inset-4 z-20 sm:inset-6" aria-hidden>
        {[
          'left-0 top-0 border-l border-t',
          'right-0 top-0 border-r border-t',
          'left-0 bottom-0 border-b border-l',
          'right-0 bottom-0 border-b border-r',
        ].map((pos) => (
          <span key={pos} className={`absolute h-8 w-8 border-foam/20 ${pos}`} />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-4 px-6 pb-4 pt-20 sm:gap-6 sm:px-10 sm:pb-8 sm:pt-28 lg:min-h-[92svh] lg:justify-between lg:gap-0 lg:pb-8">
        {/* linha superior */}
        <div className="relative z-0 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <motion.h1
            {...enter(0.15)}
            style={{ x: leftX }}
            className={`${word} text-[clamp(2.1rem,7vw,5.5rem)] lg:max-w-[58%]`}
          >
            Seu momento.
          </motion.h1>
          <motion.span
            {...enter(0.25)}
            style={{ x: rightX }}
            className={`${word} self-end text-right text-[clamp(1.3rem,4.6vw,3.4rem)] text-foam/45 sm:mt-3 sm:self-auto`}
          >
            Seu
            <br />
            sabor.
          </motion.span>
        </div>

        {/* o copo */}
        <motion.div
          style={{ y: cupY, scale: cupScale }}
          className="pointer-events-none z-30 -mb-6 flex justify-center sm:-mb-6 lg:absolute lg:inset-x-0 lg:top-[14%] lg:mb-0"
        >
          <HeroCup start={ready} className="w-[48%] max-w-[205px] sm:w-[40%] sm:max-w-[320px] lg:w-[32%] lg:max-w-[400px]" />
        </motion.div>

        {/* palavra que passa atrás do copo */}
        <motion.p
          {...enter(0.35)}
          style={{ x: rightX }}
          className={`${word} relative z-0 text-right text-[clamp(2.6rem,13vw,10rem)] text-hype-300 lg:mt-auto`}
        >
          Seu Hype.
        </motion.p>

        {/* rodapé da hero */}
        <div className="relative z-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:mt-8">
          <motion.div {...enter(0.45)} className="flex items-start gap-3">
            <HypeLogo className="h-11 w-11 shrink-0" ring={false} />
            <p className="max-w-[26ch] font-mono text-[11px] uppercase leading-[1.7] tracking-[0.12em] text-foam/55">
              Bebida funcional montada
              <br />
              na hora — energia, foco
              <br />
              e disposição
            </p>
          </motion.div>

          <motion.div {...enter(0.55)} className="flex flex-col gap-3 sm:items-end">
            <span className="glass-green inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-hype-300">
              <MapPin className="h-3.5 w-3.5" />
              {site.place} • {site.store}
            </span>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => scrollToSection('#catalogo')}>Ver sabores</Button>
              <Button
                variant="glass"
                href={whatsappUrl(`Oi, Hype Drink! Quero fazer um pedido no ${site.place}.`)}
              >
                Fazer pedido
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
