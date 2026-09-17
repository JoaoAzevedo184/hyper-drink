import { Zap, Brain, Flame, Dumbbell, Leaf, Scale } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { benefits } from '../data/benefits'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const icons = { zap: Zap, brain: Brain, flame: Flame, dumbbell: Dumbbell, leaf: Leaf, scale: Scale }

export function Benefits() {
  const reduced = useReducedMotion()

  return (
    <section id="beneficios" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[340px] w-[820px] -translate-x-1/2 rounded-[50%] bg-hype/12 blur-[120px]" aria-hidden />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          title="Conheça os benefícios"
          description="Cada copo é uma bebida funcional montada na hora: chá, N-R-G, CR7 Drive e Liftoff. Energia que não derruba depois."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = icons[b.icon]
            return (
              <Reveal key={b.title} delay={i * 0.06}>
                <motion.div
                  whileHover={reduced ? undefined : { y: -5 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className="glass flex h-full items-start gap-4 rounded-3xl p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-hype/15 text-hype-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold leading-snug text-foam">{b.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foam/55">{b.text}</p>
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
