# Hype Drink — protótipo de landing page + catálogo digital

Protótipo visual para apresentação ao cliente. Sem backend, sem banco e sem
pagamento: os pedidos abrem uma conversa simulada no WhatsApp.

## Rodar

```bash
npm install
npm run dev      # ambiente local
npm run build    # build de produção (sai em dist/)
npm run preview  # servir o build
```

Stack: React 19 + Vite + TypeScript + Tailwind CSS + Framer Motion + GSAP +
Lucide React + Lenis (smooth scroll, desligado em telas de toque).

## O que editar primeiro

| Quero mudar | Arquivo |
| --- | --- |
| WhatsApp, Instagram, Google Maps, horário, loja | `src/data/site.ts` |
| Sabores, preços, categorias, cores da bebida | `src/data/products.ts` |
| Links do menu | `src/data/site.ts` (`navLinks`) |
| Paleta e tipografia | `tailwind.config.js` + `index.html` (Google Fonts) |

Os produtos são **dados mock** de demonstração. Cada item tem `liquid`
(as duas cores do gradiente da bebida na ilustração SVG) e `ice`.

## Estrutura

```
src/
  components/
    Header.tsx            cabeçalho compacto + menu mobile em tela cheia
    Hero.tsx              hero com o copo e os CTAs
    DrinkCupAnimation.tsx animação do copo enchendo (SVG + clipPath + GSAP)
    About.tsx             "Conheça a Hype" + composição com copos
    Catalog.tsx           catálogo, filtros e transição entre categorias
    ProductCard.tsx       card com tilt no hover
    ProductModal.tsx      bottom sheet (mobile) / painel (desktop)
    Location.tsx          Espaço Prime Plaza + cartaz da marca
    InstagramSection.tsx  grid de posts de demonstração
    NFCSection.tsx        NFC → Catálogo → Pedido
    CTA.tsx               chamada final
    Footer.tsx
    WhatsAppFab.tsx       botão flutuante
    Preloader.tsx         loading inicial
    ui/                   Button, Reveal, SectionHeading, Bubbles,
                          DrinkGlass (copo ilustrado), HypeLogo, Glyphs
  data/                   site.ts (configuração) e products.ts (mock)
  hooks/                  smooth scroll e trava de scroll do body
  lib/                    montagem da URL do WhatsApp e formatação de preço
```

## Notas

- Nenhuma imagem externa: copos, selo da marca e cartaz são SVG/CSS, então
  o site carrega rápido e fica nítido em qualquer tela.
- `prefers-reduced-motion` é respeitado: as animações caem para o estado final.
- O bundle fica em ~505 kB (163 kB gzip), quase tudo React + Framer Motion +
  GSAP. Se precisar reduzir, o caminho é carregar o GSAP só na Hero via
  `import()` dinâmico.
