/**
 * ⚙️ CONFIGURAÇÃO DO PROTÓTIPO
 * Todos os dados de contato, links e textos institucionais ficam aqui.
 * Basta editar este arquivo para apontar para os canais reais do cliente.
 */
export const site = {
  brand: 'HYPE DRINK',
  tagline: 'Seu momento. Seu sabor. Seu Hype.',
  place: 'Espaço Prime Plaza',
  store: 'Loja 01',
  // 🔧 Número fictício — trocar pelo WhatsApp real (formato: 55 + DDD + número)
  whatsappNumber: '5581999999999',
  instagramHandle: '@espacoprimeplaza',
  instagramUrl: 'https://instagram.com/espacoprimeplaza',
  // 🔧 Trocar pelo endereço real no Google Maps
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Espaço+Prime+Plaza',
  address: 'Espaço Prime Plaza • Loja 01',
  hours: 'Todos os dias, 10h às 22h',
} as const

export const navLinks = [
  { label: 'A Hype', href: '#hype' },
  { label: 'Sabores', href: '#catalogo' },
  { label: 'Onde estamos', href: '#local' },
  { label: 'Instagram', href: '#instagram' },
] as const
