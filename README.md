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
    Hero.tsx              hero: tipografia gigante + copo + CTAs
    HeroCup.tsx           foto do copo revelada por máscara em onda (GSAP)
    About.tsx             "Conheça a Hype" + composição com copos
    Benefits.tsx          "Conheça os benefícios" (bebida funcional)
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

## Fotos

| Arquivo | Onde aparece | Como trocar |
| --- | --- | --- |
| `src/assets/cup.webp` | copo da Hero | PNG/WebP **com fundo transparente**, copo centralizado, proporção ~0,7:1. Ao trocar, ajuste `viewBox`, `width` e `height` no `HeroCup.tsx` para as dimensões novas |
| `src/assets/post-hype.webp` | primeiro card do Instagram | qualquer imagem quadrada |

O recorte atual foi feito por luminância a partir da foto de estúdio (fundo
preto), preservando o selo e deixando a base do copo dissolver no escuro — por
isso a Hero precisa de fundo escuro atrás do copo.

A foto original chegou comprimida (386 px de largura). Funciona no tamanho em
que é exibida, mas se o cliente tiver o arquivo original em alta, vale trocar.

## Notas

- Nenhuma imagem externa: copos, selo da marca e cartaz são SVG/CSS, então
  o site carrega rápido e fica nítido em qualquer tela.
- `prefers-reduced-motion` é respeitado: as animações caem para o estado final.
- O bundle fica em ~652 kB (277 kB gzip, já com a foto embutida), quase tudo React + Framer Motion +
  GSAP. Se precisar reduzir, o caminho é carregar o GSAP só na Hero via
  `import()` dinâmico.
