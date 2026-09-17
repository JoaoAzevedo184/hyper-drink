import { site } from '../data/site'

/** Monta a URL do WhatsApp. No protótipo o pedido é apenas simulado. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function orderMessage(product: string, qty: number, price: number): string {
  const total = (price * qty).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  return `Oi, Hype Drink! Quero pedir:\n\n• ${qty}x ${product}\nTotal: ${total}\n\nEstou no ${site.place}.`
}
