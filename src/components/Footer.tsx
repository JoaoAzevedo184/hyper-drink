import { MessageCircle, MapPin } from 'lucide-react'
import { InstagramGlyph } from './ui/Glyphs'
import { site } from '../data/site'
import { whatsappUrl } from '../lib/whatsapp'
import { Bolt } from './ui/HypeLogo'

const links = [
  { label: 'Instagram', icon: InstagramGlyph, href: site.instagramUrl },
  { label: 'WhatsApp', icon: MessageCircle, href: whatsappUrl('Oi, Hype Drink!') },
  { label: 'Localização', icon: MapPin, href: site.mapsUrl },
]

export function Footer() {
  return (
    <footer className="border-t border-white/8 px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-1.5 font-display text-2xl font-black text-foam">
            HYPE
            <Bolt className="h-5 w-5 text-[#FFC629]" />
            DRINK
          </p>
          <p className="mt-2 text-sm text-foam/50">
            {site.place} • {site.store}
          </p>
        </div>

        <nav className="flex flex-wrap gap-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              className="flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-foam/70 transition-colors hover:border-hype-300/40 hover:text-foam"
            >
              <l.icon className="h-4 w-4 text-hype-300" />
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <p className="mx-auto mt-10 max-w-6xl text-xs text-foam/30">Protótipo demonstrativo</p>
    </footer>
  )
}
