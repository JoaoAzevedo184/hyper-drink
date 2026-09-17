import { motion, useReducedMotion } from 'framer-motion'
import { Nfc, QrCode, ShoppingBag } from 'lucide-react'
import { Reveal } from './ui/Reveal'

const steps = [
  { icon: Nfc, title: 'Aproxime', text: 'Encoste o celular na tag NFC da mesa.' },
  { icon: QrCode, title: 'Escaneie', text: 'Ou aponte a câmera para o QR Code do balcão.' },
  { icon: ShoppingBag, title: 'Escolha', text: 'O catálogo abre e o pedido vai direto pro WhatsApp.' },
]

export function NFCSection() {
  const reduced = useReducedMotion()

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-5xl px-5">
        <div className="glass relative overflow-hidden rounded-[2rem] p-7 sm:p-10">
          <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-hype/20 blur-[90px]" aria-hidden />

          <Reveal>
            <h2 className="max-w-md text-[clamp(1.6rem,4.5vw,2.4rem)] font-black leading-tight text-foam">
              Aproxime. Escaneie. Escolha.
            </h2>
          </Reveal>

          <div className="relative mt-10 grid gap-4 sm:grid-cols-3">
            {/* linha que conecta as etapas */}
            <motion.span
              className="pointer-events-none absolute left-[16%] right-[16%] top-8 hidden h-px origin-left bg-gradient-to-r from-hype/10 via-hype-300/50 to-hype/10 sm:block"
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            />

            {steps.map((step, i) => (
              <Reveal key={step.title} delay={0.15 + i * 0.16} className="relative">
                <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-hype/15 text-hype-300">
                    <step.icon className="h-7 w-7" />
                    <motion.span
                      className="absolute inset-0 rounded-2xl border border-hype-300/40"
                      animate={reduced ? undefined : { scale: [1, 1.22], opacity: [0.6, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
                      aria-hidden
                    />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-foam">{step.title}</h3>
                  <p className="mt-1.5 max-w-[24ch] text-sm leading-relaxed text-foam/55">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
