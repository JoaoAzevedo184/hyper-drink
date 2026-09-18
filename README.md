[REACT__BADGE]: https://img.shields.io/badge/React-005CFE?style=for-the-badge&logo=react
[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[VITE__BADGE]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[TAILWIND__BADGE]: https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white

<h1 align="center" style="font-weight: bold;">Hype Drink 🥤</h1>

![react][REACT__BADGE]
![typescript][TYPESCRIPT__BADGE]
![vite][VITE__BADGE]
![tailwind][TAILWIND__BADGE]

<details open="open">
<summary>Table of Contents</summary>

- [📌 About](#about)
- [🚀 Getting started](#started)
  - [Prerequisites](#prerequisites)
  - [Cloning](#cloning)
  - [Starting](#starting)
- [✏️ O que editar primeiro](#editar)
- [📁 Estrutura](#estrutura)
- [🖼️ Fotos](#fotos)
- [📝 Notas](#notas)
- [🤝 Collaborators](#colab)
- [📫 Contribute](#contribute)

</details>

<p align="center">
    <img src="src/assets/hero.png" alt="Hype Drink — copo na Hero" width="400px">
</p>

<h2 id="about">📌 About</h2>

Protótipo visual de landing page + catálogo digital para apresentação ao
cliente. Sem backend, sem banco e sem pagamento: os pedidos abrem uma
conversa simulada no WhatsApp.

Stack: React 19 + Vite + TypeScript + Tailwind CSS + Framer Motion + GSAP +
Lucide React + Lenis (smooth scroll, desligado em telas de toque).

<h2 id="started">🚀 Getting started</h2>

<h3 id="prerequisites">Prerequisites</h3>

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

<h3 id="cloning">Cloning</h3>

```bash
git clone https://github.com/JoaoAzevedo184/hyper-drink.git
```

<h3 id="starting">Starting</h3>

```bash
cd hyper-drink
npm install
npm run dev      # ambiente local
npm run build    # build de produção (sai em dist/)
npm run preview  # servir o build
npm run lint      # oxlint
```

<h2 id="editar">✏️ O que editar primeiro</h2>

| Quero mudar | Arquivo |
| --- | --- |
| WhatsApp, Instagram, Google Maps, horário, loja | `src/data/site.ts` |
| Sabores, preços, categorias, cores da bebida | `src/data/products.ts` |
| Links do menu | `src/data/site.ts` (`navLinks`) |
| Paleta e tipografia | `tailwind.config.js` + `index.html` (Google Fonts) |

Os produtos são **dados mock** de demonstração. Cada item tem `liquid`
(as duas cores do gradiente da bebida na ilustração SVG) e `ice`.

<h2 id="estrutura">📁 Estrutura</h2>

```
src/
  components/
    Header.tsx            cabeçalho compacto + menu mobile em tela cheia
    Hero.tsx               hero: tipografia gigante + copo + CTAs
    HeroCup.tsx            foto do copo revelada por máscara em onda (GSAP)
    About.tsx              "Conheça a Hype" + composição com copos
    Benefits.tsx           "Conheça os benefícios" (bebida funcional)
    Catalog.tsx            catálogo, filtros e transição entre categorias
    ProductCard.tsx        card com tilt no hover
    ProductModal.tsx       bottom sheet (mobile) / painel (desktop)
    Location.tsx           Espaço Prime Plaza + cartaz da marca
    InstagramSection.tsx   grid de posts de demonstração
    NFCSection.tsx         NFC → Catálogo → Pedido
    CTA.tsx                chamada final
    Footer.tsx
    WhatsAppFab.tsx        botão flutuante
    Preloader.tsx          loading inicial
    ui/                    Button, Reveal, SectionHeading, Bubbles,
                            DrinkGlass (copo ilustrado), HypeLogo, Glyphs
  data/                    site.ts (configuração) e products.ts (mock)
  hooks/                   smooth scroll e trava de scroll do body
  lib/                     montagem da URL do WhatsApp e formatação de preço
```

<h2 id="fotos">🖼️ Fotos</h2>

| Arquivo | Onde aparece | Como trocar |
| --- | --- | --- |
| `src/assets/cup.webp` | copo da Hero | PNG/WebP **com fundo transparente**, copo centralizado, proporção ~0,7:1. Ao trocar, ajuste `viewBox`, `width` e `height` no `HeroCup.tsx` para as dimensões novas |
| `src/assets/post-hype.webp` | primeiro card do Instagram | qualquer imagem quadrada |

O recorte atual foi feito por luminância a partir da foto de estúdio (fundo
preto), preservando o selo e deixando a base do copo dissolver no escuro — por
isso a Hero precisa de fundo escuro atrás do copo.

A foto original chegou comprimida (386 px de largura). Funciona no tamanho em
que é exibida, mas se o cliente tiver o arquivo original em alta, vale trocar.

<h2 id="notas">📝 Notas</h2>

- Nenhuma imagem externa: copos, selo da marca e cartaz são SVG/CSS, então
  o site carrega rápido e fica nítido em qualquer tela.
- `prefers-reduced-motion` é respeitado: as animações caem para o estado final.
- O bundle fica em ~652 kB (277 kB gzip, já com a foto embutida), quase tudo
  React + Framer Motion + GSAP. Se precisar reduzir, o caminho é carregar o
  GSAP só na Hero via `import()` dinâmico.

<h2 id="colab">🤝 Collaborators</h2>

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/JoaoAzevedo184">
        <img src="https://github.com/JoaoAzevedo184.png" width="100px;" alt="João Azevedo Profile Picture"/><br>
        <sub>
          <b>João Azevedo</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

<h2 id="contribute">📫 Contribute</h2>

1. `git clone https://github.com/JoaoAzevedo184/hyper-drink.git`
2. `git checkout -b feature/NOME`
3. Siga o padrão de commits
4. Abra um Pull Request explicando o problema resolvido ou a funcionalidade
   feita — se houver, anexe screenshot das mudanças visuais — e aguarde a
   revisão

<h3>Documentações que podem ajudar</h3>

[📝 Como criar um Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[💾 Padrão de commits](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
