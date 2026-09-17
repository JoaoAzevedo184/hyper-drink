import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Zap, CupSoda, Sparkles, MapPin } from 'lucide-react'
import { DrinkGlass } from './ui/DrinkGlass'
import { Reveal } from './ui/Reveal'
import { site } from '../data/site'

const features = [
  { icon: Zap, title: 'Refrescante', text: 'Servido gelado, do jeito que o dia pede.' },
  { icon: CupSoda, title: 'Diversos sabores', text: 'Dos clássicos aos cremosos, tem Hype pra todo mundo.' },
  { icon: Sparkles, title: 'Combinações especiais', text: 'Misturas criadas pela casa, difíceis de achar por aí.' },
  { icon: MapPin, title: 'No Espaço Prime Plaza', text: `${site.store} — é só chegar e escolher.` },
]

export function About() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const slow = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 40, reduced ? 0 : -40])
  const fast = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 80, reduced ? 0 : -70])

  return (
    <section id="hype" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[440px] w-[440px] -translate-x-1/2 rounded-full bg-hype/10 blur-[120px]" aria-hidden />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 lg:grid-cols-2">
        {/* composição visual */}
        <div ref={ref} className="relative order-2 lg:order-1">
          <div className="relative mx-auto aspect-square w-full max-w-[460px]">
            {/* formas orgânicas */}
            <div className="absolute inset-[8%] rounded-[46%_54%_38%_62%/52%_38%_62%_48%] bg-gradient-to-br from-hype/30 to-hype-900/10 blur-[2px]" aria-hidden />
            <div className="absolute inset-[18%] rounded-[58%_42%_60%_40%/40%_58%_42%_60%] border border-white/10" aria-hidden />

            <motion.div style={{ y: fast }} className="absolute left-[2%] top-[30%] w-[25%]">
              <DrinkGlass colors={['#FFD166', '#F58E1F']} ice badge={false} className="w-full drop-shadow-2xl" />
            </motion.div>
            <motion.div style={{ y: slow, x: '-50%' }} className="absolute left-1/2 top-[8%] w-[32%]">
              <DrinkGlass colors={['#6BE98F', '#046B31']} ice className="w-full drop-shadow-2xl" />
            </motion.div>
            <motion.div style={{ y: fast }} className="absolute right-[2%] top-[34%] w-[23%]">
              <DrinkGlass colors={['#FF9BB3', '#E33A5E']} badge={false} className="w-full drop-shadow-2xl" />
            </motion.div>

            {/* ingredientes / detalhes flutuantes */}
            <motion.span
              style={{ y: slow }}
              className="glass absolute left-[0%] top-[16%] rounded-full px-4 py-2 text-xs text-foam/80"
            >
              🍋 fruta fresca
            </motion.span>
            <motion.span
              style={{ y: fast }}
              className="glass-green absolute right-[2%] top-[2%] rounded-full px-4 py-2 text-xs text-hype-300"
            >
              ⚡ energia
            </motion.span>
            <motion.span
              style={{ y: slow }}
              className="glass absolute bottom-[-1%] right-[6%] rounded-full px-4 py-2 text-xs text-foam/80"
            >
              🧊 sempre gelado
            </motion.span>
          </div>
        </div>

        {/* texto + cards */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <h2 className="text-[clamp(2rem,6vw,3.4rem)] font-black leading-[0.98] text-foam">
              Mais que uma bebida.
              <br />
              <span className="text-hype-300">É o seu momento Hype.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-foam/60 sm:text-lg">
              A Hype Drink nasceu pra acompanhar o intervalo, o encontro rápido, o fim de tarde.
              Copo transparente, bebida na medida e aquele sabor que faz você voltar.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={0.1 + i * 0.07}>
                <motion.div
                  whileHover={reduced ? undefined : { y: -5 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className="glass h-full rounded-3xl p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-hype/15 text-hype-300">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-foam">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foam/55">{f.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
