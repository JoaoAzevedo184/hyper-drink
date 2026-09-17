import { Navigation, MessageCircle, Clock } from 'lucide-react'
import { InstagramGlyph } from './ui/Glyphs'
import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../data/site'
import { whatsappUrl } from '../lib/whatsapp'
import { Reveal } from './ui/Reveal'
import { HypeLogo } from './ui/HypeLogo'
import { DrinkGlass } from './ui/DrinkGlass'

const actions = [
  { label: 'Como chegar', icon: Navigation, href: site.mapsUrl },
  { label: 'WhatsApp', icon: MessageCircle, href: whatsappUrl('Oi! Queria saber onde vocês ficam no Espaço Prime Plaza.') },
  { label: 'Instagram', icon: InstagramGlyph, href: site.instagramUrl },
]

export function Location() {
  const reduced = useReducedMotion()

  return (
    <section id="local" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* a fachada: parede clara, cartaz verde e a placa da loja */}
          <Reveal mask>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#E9EAEA] to-[#C9CDCB] p-6 shadow-card sm:p-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
                  backgroundSize: '120px 150px',
                }}
                aria-hidden
              />

              <div className="relative flex items-start gap-4 sm:gap-8">
                {/* cartaz */}
                <motion.div
                  whileHover={reduced ? undefined : { rotate: -1.2, y: -6 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                  className="w-full max-w-[320px] rounded-2xl bg-gradient-to-b from-hype to-hype-700 p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]"
                >
                  <p className="text-center font-display text-sm font-black tracking-tight text-white sm:text-base">
                    CONHEÇA OS BENEFÍCIOS
                  </p>
                  <div className="relative mt-4 flex items-end justify-center">
                    <DrinkGlass colors={['#FF5C7A', '#A8123C']} className="-mr-5 w-[26%] opacity-90" badge={false} />
                    <DrinkGlass colors={['#FFC46B', '#F2701F']} ice className="z-10 w-[34%]" />
                    <DrinkGlass colors={['#7FE3FF', '#1566D8']} className="-ml-5 w-[26%] opacity-90" badge={false} />
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <div className="grid h-12 w-12 grid-cols-4 grid-rows-4 gap-[2px] rounded-md bg-white p-1" aria-hidden>
                      {Array.from({ length: 16 }, (_, i) => (
                        <span key={i} className={`rounded-[1px] ${[0, 1, 4, 3, 6, 9, 11, 12, 15, 5, 10].includes(i) ? 'bg-void' : 'bg-transparent'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-white">{site.instagramHandle}</span>
                  </div>
                </motion.div>

                {/* placa da loja */}
                <div className="mt-6 shrink-0 rounded-lg border border-black/15 bg-white px-3 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-semibold tracking-wide text-void/60">LOJA</p>
                  <p className="font-display text-2xl font-black leading-none text-void">01</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-[clamp(2rem,6vw,3.4rem)] font-black leading-[0.98] text-foam">
                Encontre a Hype
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-foam/60 sm:text-lg">
                Estamos no {site.place}. Venha conhecer nossos sabores.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="glass-green mt-8 rounded-[1.75rem] p-6">
                <div className="flex items-center gap-4">
                  <HypeLogo className="h-16 w-16 shrink-0" ring={false} />
                  <div>
                    <p className="font-display text-xl font-black text-foam">{site.brand}</p>
                    <p className="text-sm text-foam/60">{site.place}</p>
                    <p className="text-sm text-hype-300">{site.store}</p>
                  </div>
                </div>

                <p className="mt-5 flex items-center gap-2 text-sm text-foam/50">
                  <Clock className="h-4 w-4 text-hype-300" />
                  {site.hours}
                </p>

                <div className="mt-6 grid gap-2 sm:grid-cols-3">
                  {actions.map((a) => (
                    <a
                      key={a.label}
                      href={a.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex min-h-[52px] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 text-[0.9rem] font-semibold text-foam transition-all hover:-translate-y-0.5 hover:bg-white/10 active:scale-95"
                    >
                      <a.icon className="h-4 w-4 text-hype-300" />
                      {a.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
