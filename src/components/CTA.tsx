import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { site } from '../data/site'
import { whatsappUrl } from '../lib/whatsapp'
import { DrinkGlass } from './ui/DrinkGlass'
import { Bubbles } from './ui/Bubbles'
import { Reveal } from './ui/Reveal'

export function CTA() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const cupY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 70, reduced ? 0 : -90])

  return (
    <section className="px-4 pb-16 pt-8 sm:pb-24">
      <div
        ref={ref}
        className="relative mx-auto max-w-6xl rounded-[2.5rem] bg-gradient-to-br from-hype via-hype-700 to-hype-900 px-6 py-14 sm:px-12 sm:py-20"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
          <Bubbles count={10} opacity={0.35} />
        </div>
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-white/15 blur-[80px]" aria-hidden />

        <div className="relative grid items-center gap-10 sm:grid-cols-[1.2fr_0.8fr]">
          <div className="text-center sm:text-left">
            <Reveal>
              <h2 className="text-[clamp(2.2rem,7vw,4rem)] font-black leading-[0.95] text-white">
                Já escolheu seu Hype?
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 text-lg text-white/75">Faça seu pedido e aproveite.</p>
            </Reveal>
            <Reveal delay={0.16}>
              <a
                href={whatsappUrl(`Oi, Hype Drink! Quero pedir agora no ${site.place}.`)}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-9 inline-flex min-h-[60px] items-center justify-center rounded-full bg-void px-10 font-display text-lg font-black tracking-tight text-foam transition-all hover:-translate-y-1 hover:bg-black active:scale-[0.98]"
              >
                PEDIR AGORA
              </a>
            </Reveal>
          </div>

          {/* copo saindo da seção */}
          <motion.div style={{ y: cupY }} className="relative mx-auto -mb-20 w-[48%] max-w-[230px] sm:-mt-24 sm:mb-0 sm:w-full sm:max-w-[250px]">
            <DrinkGlass colors={['#FFD166', '#F58E1F']} ice className="w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)]" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
