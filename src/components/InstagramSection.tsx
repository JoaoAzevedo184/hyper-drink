import { motion, useReducedMotion } from 'framer-motion'
import { Heart, Play } from 'lucide-react'
import { InstagramGlyph } from './ui/Glyphs'
import { site } from '../data/site'
import { DrinkGlass } from './ui/DrinkGlass'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'

/** 📸 Posts de demonstração — trocar por conteúdo real do perfil. */
const posts = [
  { caption: 'Sextou com Hype 💚', likes: 218, reel: false, colors: ['#6BE98F', '#046B31'] as [string, string] },
  { caption: 'Novo sabor na casa', likes: 342, reel: true, colors: ['#FFD166', '#F58E1F'] as [string, string] },
  { caption: 'Gelado do jeito certo', likes: 176, reel: false, colors: ['#7FE3FF', '#1E7FE0'] as [string, string] },
  { caption: 'Seu momento Hype', likes: 405, reel: true, colors: ['#FF9BB3', '#E33A5E'] as [string, string] },
]

export function InstagramSection() {
  const reduced = useReducedMotion()

  return (
    <section id="instagram" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <h2 className="text-[clamp(2rem,6vw,3.4rem)] font-black leading-[0.98] text-foam">
                Entre no Hype
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-3 text-lg text-hype-300">{site.instagramHandle}</p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Button href={site.instagramUrl} variant="glass" icon={<InstagramGlyph className="h-4 w-4" />}>
              Seguir no Instagram
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {posts.map((post, i) => (
            <Reveal key={post.caption} delay={i * 0.08}>
              <motion.a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                whileHover={reduced ? undefined : { y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-white/10"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(120% 80% at 50% 10%, ${post.colors[0]}44, transparent 60%), linear-gradient(160deg, #0B120E, #050806)`,
                  }}
                />
                <DrinkGlass
                  colors={post.colors}
                  className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/70 to-transparent p-4 pt-10">
                  <p className="text-sm font-medium text-foam">{post.caption}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-foam/50">
                    <Heart className="h-3.5 w-3.5 fill-current text-hype-300" />
                    {post.likes}
                  </p>
                </div>
                {post.reel && (
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-void/60 backdrop-blur">
                    <Play className="h-3.5 w-3.5 fill-current text-foam" />
                  </span>
                )}
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
