/**
 * 🧪 DADOS MOCK — PROTÓTIPO
 * Nenhum destes sabores é oficial: são apenas exemplos para demonstração visual.
 * Para atualizar o catálogo real, basta editar a lista abaixo (nome, descrição,
 * ingredientes, preço, categoria e as duas cores usadas na ilustração da bebida).
 */

export type Category = 'classicos' | 'frutados' | 'cremosos' | 'especiais'

export type Product = {
  id: string
  name: string
  short: string
  ingredients: string[]
  price: number
  category: Category
  /** Cores da ilustração SVG: [topo do líquido, fundo do líquido] */
  liquid: [string, string]
  /** Destaque opcional exibido como selo no card */
  badge?: string
  ice?: boolean
}

export const categories: { id: 'todos' | Category; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'classicos', label: 'Clássicos' },
  { id: 'frutados', label: 'Frutados' },
  { id: 'cremosos', label: 'Cremosos' },
  { id: 'especiais', label: 'Especiais' },
]

export const products: Product[] = [
  {
    id: 'tropical',
    name: 'Hype Tropical',
    short: 'Maracujá • Manga • Limão',
    ingredients: ['Maracujá', 'Manga', 'Limão siciliano', 'Gelo Hype'],
    price: 12,
    category: 'frutados',
    liquid: ['#FFD166', '#F58E1F'],
    badge: 'Mais pedido',
    ice: true,
  },
  {
    id: 'morango',
    name: 'Hype Morango',
    short: 'Morango • Leite • Especial Hype',
    ingredients: ['Morango', 'Leite', 'Creme Hype', 'Toque de baunilha'],
    price: 14,
    category: 'cremosos',
    liquid: ['#FF9BB3', '#E33A5E'],
  },
  {
    id: 'blue',
    name: 'Hype Blue',
    short: 'Mix cítrico • Blue Ice',
    ingredients: ['Mix cítrico', 'Blue curaçau (sem álcool)', 'Limão', 'Gelo'],
    price: 15,
    category: 'especiais',
    liquid: ['#7FE3FF', '#1E7FE0'],
    ice: true,
  },
  {
    id: 'energy',
    name: 'Hype Energy',
    short: 'Mix especial • Energético',
    ingredients: ['Energético', 'Mix cítrico Hype', 'Hortelã', 'Gelo'],
    price: 16,
    category: 'especiais',
    liquid: ['#B6FF5C', '#079447'],
    badge: 'Turbo',
    ice: true,
  },
  {
    id: 'chocolate',
    name: 'Hype Chocolate',
    short: 'Chocolate • Creme',
    ingredients: ['Chocolate belga', 'Creme de leite', 'Chantilly', 'Cacau'],
    price: 14,
    category: 'cremosos',
    liquid: ['#B98157', '#4A2A17'],
  },
  {
    id: 'limao',
    name: 'Hype Limão',
    short: 'Limão • Hortelã • Água com gás',
    ingredients: ['Limão taiti', 'Hortelã', 'Água com gás', 'Gelo'],
    price: 12,
    category: 'classicos',
    liquid: ['#D9FF8A', '#59B62B'],
    ice: true,
  },
  {
    id: 'cola',
    name: 'Hype Cola',
    short: 'Cola gelada • Limão',
    ingredients: ['Refrigerante de cola', 'Limão', 'Gelo Hype'],
    price: 10,
    category: 'classicos',
    liquid: ['#8C5A3C', '#2B140A'],
    ice: true,
  },
  {
    id: 'uva',
    name: 'Hype Uva',
    short: 'Uva • Frutas vermelhas',
    ingredients: ['Uva', 'Frutas vermelhas', 'Limão', 'Gelo'],
    price: 13,
    category: 'frutados',
    liquid: ['#C79BFF', '#6425C4'],
  },
]
