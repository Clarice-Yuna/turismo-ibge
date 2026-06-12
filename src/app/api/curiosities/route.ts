import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

const FALLBACK_CURIOSITIES = [
  {
    id: 'cur1',
    title: 'São Paulo: O Gigante da Hospedagem',
    content: 'São Paulo possuía 5.858 estabelecimentos de hospedagem em 2016 — quase 19% de todo o Brasil. Só a capital paulista tinha mais leitos (124.794) que muitos estados inteiros.',
    category: 'Hospedagem',
    icon: 'Trophy',
    source: 'IBGE PSH 2016',
    order: 1,
  },
  {
    id: 'cur2',
    title: '92% dos Hotéis são Independentes',
    content: 'Dos 17.011 estabelecimentos com 5+ funcionários, 15.687 eram independentes. Apenas 276 integravam cadeias internacionais — mostrando que o mercado brasileiro é dominado por negócios locais.',
    category: 'Redes',
    icon: 'Store',
    source: 'IBGE PSH 2016',
    order: 2,
  },
  {
    id: 'cur3',
    title: 'O Paradoxo da Bahia',
    content: 'A Bahia possuía mais pousadas (1.275) do que hotéis (972), um padrão único entre os grandes estados. Isso reflete a forte vocação para turismo de experiência e hospedagem mais aconchegante.',
    category: 'Tipos',
    icon: 'Lightbulb',
    source: 'IBGE PSH 2016',
    order: 3,
  },
  {
    id: 'cur4',
    title: 'Roraima: O Menor Mercado',
    content: 'Com apenas 60 estabelecimentos de hospedagem e todos independentes, Roraima era o estado com menor infraestrutura hoteleira do Brasil em 2016.',
    category: 'Hospedagem',
    icon: 'MapPin',
    source: 'IBGE PSH 2016',
    order: 4,
  },
  {
    id: 'cur5',
    title: '1 Milhão de Quartos',
    content: 'O Brasil possuía 1.011.254 unidades habitacionais em hospedagem — mais de 1 milhão de quartos! Colocados em fila, dariam a volta na Terra mais de 6 vezes.',
    category: 'Capacidade',
    icon: 'Bed',
    source: 'IBGE PSH 2016',
    order: 5,
  },
  {
    id: 'cur6',
    title: 'O Nordeste é Praia',
    content: 'Dos 2.194 estabelecimentos em orla marítima no Brasil, a grande maioria estava no Nordeste. Ceará (194), Rio Grande do Norte (153) e Bahia (355) lideravam em hospedagem à beira-mar.',
    category: 'Localização',
    icon: 'Waves',
    source: 'IBGE PSH 2016',
    order: 6,
  },
  {
    id: 'cur7',
    title: 'Luxo é para Poucos',
    content: 'Apenas 666 estabelecimentos (3,9%) eram classificados como luxo. São Paulo concentrava 134 deles — 20% de toda a oferta de luxo do país.',
    category: 'Categorias',
    icon: 'Crown',
    source: 'IBGE PSH 2016',
    order: 7,
  },
  {
    id: 'cur8',
    title: 'Motéis: O Terceiro Tipo Mais Comum',
    content: 'Com 4.460 estabelecimentos, motéis eram o terceiro tipo mais comum no Brasil. São Paulo liderava com 918 motéis — quase 21% do total nacional.',
    category: 'Tipos',
    icon: 'Car',
    source: 'IBGE PSH 2016',
    order: 8,
  },
  {
    id: 'cur9',
    title: '2,4 Milhões de Leitos',
    content: 'O Brasil oferecia 2.407.892 leitos em 2016. Se todos fossem ocupados simultaneamente, seria como se a população de Natal (RN) estivesse hospedada!',
    category: 'Capacidade',
    icon: 'Calculator',
    source: 'IBGE PSH 2016',
    order: 9,
  },
  {
    id: 'cur10',
    title: 'Só 2,2% de Quartos Adaptados',
    content: 'Das 1.011.254 unidades habitacionais, apenas 22.543 (2,2%) eram adaptadas para pessoas com deficiência — um desafio enorme para a acessibilidade no turismo brasileiro.',
    category: 'Capacidade',
    icon: 'Accessibility',
    source: 'IBGE PSH 2016',
    order: 10,
  },
  {
    id: 'cur11',
    title: 'Brasília: Campeã de Grandes Hotéis',
    content: 'O Distrito Federal tinha 48 estabelecimentos com 100+ UHs em 279 totais (17,2%) — a maior proporção de grandes hotéis entre todos os estados.',
    category: 'Capacidade',
    icon: 'Building2',
    source: 'IBGE PSH 2016',
    order: 11,
  },
  {
    id: 'cur12',
    title: 'Sem Praia, mas com Rural',
    content: 'Estados sem litoral como Minas Gerais (290), São Paulo (393) e Goiás (67) compensavam com estabelecimentos em zona rural e reservas ambientais, oferecendo turismo ecológico.',
    category: 'Localização',
    icon: 'TreePine',
    source: 'IBGE PSH 2016',
    order: 12,
  },
  {
    id: 'cur13',
    title: 'Fortaleza: Capital da Hospedagem no NE',
    content: 'Com 323 estabelecimentos e 30.733 leitos, Fortaleza era a capital nordestina com maior infraestrutura hoteleira em 2016.',
    category: 'Capitais',
    icon: 'Sun',
    source: 'IBGE PSH 2016',
    order: 13,
  },
  {
    id: 'cur14',
    title: 'Hostels: Fenômeno Urbano',
    content: 'Dos 480 hostels do Brasil, 130 estavam no Rio de Janeiro e 85 em São Paulo — as duas cidades mais visitadas por turistas internacionais.',
    category: 'Tipos',
    icon: 'Users',
    source: 'IBGE PSH 2016',
    order: 14,
  },
  {
    id: 'cur15',
    title: 'Leitos Duplos Dominam',
    content: 'Leitos duplos (1.376.692) superavam os simples (1.031.200) em todo o Brasil — uma proporção de 57% vs 43%, mostrando foco em casais e famílias.',
    category: 'Capacidade',
    icon: 'Heart',
    source: 'IBGE PSH 2016',
    order: 15,
  },
  {
    id: 'cur16',
    title: 'Santa Catarina: Diversidade',
    content: 'SC tinha 71 apart-hotéis, 657 pousadas e 798 hotéis — uma das distribuições mais equilibradas entre tipos, refletindo turismo diversificado.',
    category: 'Tipos',
    icon: 'Scale',
    source: 'IBGE PSH 2016',
    order: 16,
  },
  {
    id: 'cur17',
    title: 'A Cadena Hoteleira Paulista',
    content: 'São Paulo concentrava 204 dos 1.048 estabelecimentos de cadeias nacionais (19,5%) e 75 dos 276 de cadeias internacionais (27,2%).',
    category: 'Redes',
    icon: 'Network',
    source: 'IBGE PSH 2016',
    order: 17,
  },
  {
    id: 'cur18',
    title: 'Pequenos Predominam',
    content: 'Dos 31.299 estabelecimentos, apenas 4.830 (15,4%) tinham 50 ou mais unidades habitacionais. A maioria era de pequeno porte com 10 a 29 UHs.',
    category: 'Capacidade',
    icon: 'BarChart3',
    source: 'IBGE PSH 2016',
    order: 18,
  },
  {
    id: 'cur19',
    title: 'Natal: Capital Adaptada',
    content: 'Natal (RN) possuía 366 unidades habitacionais adaptadas — a maior proporção entre as capitais nordestinas, mostrando compromisso com acessibilidade.',
    category: 'Capitais',
    icon: 'ShieldCheck',
    source: 'IBGE PSH 2016',
    order: 19,
  },
  {
    id: 'cur20',
    title: 'Turístico: A Categoria Média',
    content: '6.284 estabelecimentos eram classificados como turístico/médio conforto — a categoria mais comum, representando 37% do total com 5+ funcionários.',
    category: 'Categorias',
    icon: 'Star',
    source: 'IBGE PSH 2016',
    order: 20,
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where = category ? { category } : {}

    const curiosities = await db.curiosity.findMany({
      where,
      orderBy: { order: 'asc' },
    })

    if (curiosities.length > 0) {
      return NextResponse.json({ curiosities })
    }

    console.warn('[API /curiosities] Database returned empty, using fallback data')
    const filtered = category
      ? FALLBACK_CURIOSITIES.filter((c) => c.category === category)
      : FALLBACK_CURIOSITIES
    return NextResponse.json({ curiosities: filtered })
  } catch (error) {
    console.error('[API /curiosities] Fetch curiosities error:', error)
    if (error instanceof Error) {
      console.error('[API /curiosities] Error name:', error.name)
      console.error('[API /curiosities] Error message:', error.message)
      console.error('[API /curiosities] Error stack:', error.stack)
    }
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const filtered = category
      ? FALLBACK_CURIOSITIES.filter((c) => c.category === category)
      : FALLBACK_CURIOSITIES
    console.warn('[API /curiosities] Returning fallback data due to database error')
    return NextResponse.json({ curiosities: filtered })
  }
}
