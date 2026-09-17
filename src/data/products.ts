/**
 * CATÁLOGO — PROTÓTIPO
 *
 * O Hype Drink é uma bebida funcional montada na hora: chá (Herbal Concentrate),
 * N-R-G, CR7 Drive e um sachê de Liftoff. O que muda de um sabor para o outro é
 * a combinação de chá + Liftoff + CR7 Drive.
 *
 * ⚠️ Os nomes seguem essa lógica real, mas PREÇOS e a lista final de sabores
 * precisam ser confirmados com a loja antes de publicar. Editar aqui.
 */

export type Category = 'energia' | 'foco' | 'metabolismo' | 'treino'

export type Product = {
  id: string
  name: string
  /** Composição resumida, exibida no card */
  short: string
  /** Composição completa, exibida no modal */
  ingredients: string[]
  /** Benefícios em destaque desse copo */
  benefits: string[]
  price: number
  /** Tamanho do copo servido */
  size: string
  category: Category
  /** Cores da ilustração SVG: [topo do líquido, fundo do líquido] */
  liquid: [string, string]
  badge?: string
  ice?: boolean
}

export const categories: { id: 'todos' | Category; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'energia', label: 'Energia' },
  { id: 'foco', label: 'Foco' },
  { id: 'metabolismo', label: 'Metabolismo' },
  { id: 'treino', label: 'Pré-treino' },
]

export const products: Product[] = [
  {
    id: 'frutas-vermelhas',
    name: 'Hype Frutas Vermelhas',
    short: 'Chá original • CR7 Berry Mix • Liftoff amora',
    ingredients: ['Herbal Concentrate original', 'N-R-G', 'CR7 Drive Berry Mix', 'Liftoff amora', 'Muito gelo'],
    benefits: ['Energia', 'Disposição'],
    price: 16,
    size: '500 ml',
    category: 'energia',
    liquid: ['#FF5C7A', '#A8123C'],
    badge: 'Mais pedido',
    ice: true,
  },
  {
    id: 'limao',
    name: 'Hype Limão Siciliano',
    short: 'Chá limão • Liftoff limão siciliano',
    ingredients: ['Herbal Concentrate limão', 'N-R-G', 'CR7 Drive', 'Liftoff limão siciliano', 'Muito gelo'],
    benefits: ['Foco', 'Concentração'],
    price: 16,
    size: '500 ml',
    category: 'foco',
    liquid: ['#EEFF8A', '#B6C41E'],
    ice: true,
  },
  {
    id: 'tropical',
    name: 'Hype Tropical',
    short: 'Chá pêssego • Liftoff abacaxi • CR7 Drive',
    ingredients: ['Herbal Concentrate pêssego', 'N-R-G', 'CR7 Drive', 'Liftoff abacaxi', 'Muito gelo'],
    benefits: ['Energia', 'Hidratação'],
    price: 16,
    size: '500 ml',
    category: 'energia',
    liquid: ['#FFC46B', '#F2701F'],
    ice: true,
  },
  {
    id: 'blue',
    name: 'Hype Blue',
    short: 'Mix cítrico • Liftoff frutas tropicais',
    ingredients: ['Herbal Concentrate original', 'N-R-G', 'CR7 Drive', 'Liftoff frutas tropicais', 'Muito gelo'],
    benefits: ['Foco', 'Ápice de energia'],
    price: 18,
    size: '700 ml',
    category: 'foco',
    liquid: ['#7FE3FF', '#1566D8'],
    ice: true,
  },
  {
    id: 'acai',
    name: 'Hype Açaí',
    short: 'Chá verde • CR7 Drive açaí',
    ingredients: ['Herbal Concentrate chá verde', 'N-R-G', 'CR7 Drive açaí', 'Liftoff amora', 'Muito gelo'],
    benefits: ['Metabolismo', 'Antioxidante'],
    price: 17,
    size: '500 ml',
    category: 'metabolismo',
    liquid: ['#C79BFF', '#4E1799'],
    ice: true,
  },
  {
    id: 'pessego',
    name: 'Hype Pêssego',
    short: 'Chá pêssego • Liftoff tangerina',
    ingredients: ['Herbal Concentrate pêssego', 'N-R-G', 'CR7 Drive', 'Liftoff tangerina', 'Muito gelo'],
    benefits: ['Metabolismo', 'Disposição'],
    price: 15,
    size: '500 ml',
    category: 'metabolismo',
    liquid: ['#FFD166', '#EC8A12'],
    ice: true,
  },
  {
    id: 'melancia',
    name: 'Hype Melancia',
    short: 'Chá frutas cítricas • Liftoff melancia',
    ingredients: ['Herbal Concentrate frutas cítricas', 'N-R-G', 'CR7 Drive', 'Liftoff melancia', 'Muito gelo'],
    benefits: ['Hidratação', 'Leveza'],
    price: 15,
    size: '500 ml',
    category: 'energia',
    liquid: ['#FF9BB3', '#DB2C52'],
    ice: true,
  },
  {
    id: 'pre-treino',
    name: 'Hype Pré-treino',
    short: 'CR7 Drive reforçado • dose extra de N-R-G',
    ingredients: ['Herbal Concentrate original', 'N-R-G (dose extra)', 'CR7 Drive Berry Mix', 'Liftoff limão', 'Muito gelo'],
    benefits: ['Rendimento', 'Resistência física'],
    price: 20,
    size: '700 ml',
    category: 'treino',
    liquid: ['#FF8A5C', '#B32409'],
    badge: 'Turbo',
    ice: true,
  },
]
