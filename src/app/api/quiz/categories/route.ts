import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

const FALLBACK_CATEGORIES = [
  {
    id: 'cat1',
    name: 'Hospedagem no Brasil',
    description: 'Dados gerais sobre estabelecimentos de hospedagem no país',
    icon: 'Building2',
    color: '#10b981',
    order: 1,
    questionCount: 5,
  },
  {
    id: 'cat2',
    name: 'Tipos de Estabelecimentos',
    description: 'Hotéis, pousadas, motéis e demais tipos',
    icon: 'Hotel',
    color: '#f59e0b',
    order: 2,
    questionCount: 5,
  },
  {
    id: 'cat3',
    name: 'Capacidade e Leitos',
    description: 'Unidades habitacionais e capacidade de hospedagem',
    icon: 'Bed',
    color: '#06b6d4',
    order: 3,
    questionCount: 5,
  },
  {
    id: 'cat4',
    name: 'Categorias e Classificação',
    description: 'Luxo, superior, turístico, econômico e simples',
    icon: 'Star',
    color: '#8b5cf6',
    order: 4,
    questionCount: 5,
  },
  {
    id: 'cat5',
    name: 'Redes e Cadeias',
    description: 'Estabelecimentos independentes e cadeias hoteleiras',
    icon: 'Link',
    color: '#ec4899',
    order: 5,
    questionCount: 5,
  },
  {
    id: 'cat6',
    name: 'Localização Geográfica',
    description: 'Distribuição por zona urbana, orla marítima e rural',
    icon: 'MapPin',
    color: '#22c55e',
    order: 6,
    questionCount: 5,
  },
]

export async function GET() {
  try {
    const categories = await db.quizCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { questions: true },
        },
      },
    })

    if (categories.length > 0) {
      const categoriesWithCount = categories.map(({ _count, ...category }) => ({
        ...category,
        questionCount: _count.questions,
      }))
      return NextResponse.json({ categories: categoriesWithCount })
    }

    console.warn('[API /quiz/categories] Database returned empty, using fallback data')
    return NextResponse.json({ categories: FALLBACK_CATEGORIES })
  } catch (error) {
    console.error('[API /quiz/categories] Fetch categories error:', error)
    if (error instanceof Error) {
      console.error('[API /quiz/categories] Error name:', error.name)
      console.error('[API /quiz/categories] Error message:', error.message)
      console.error('[API /quiz/categories] Error stack:', error.stack)
    }
    console.warn('[API /quiz/categories] Returning fallback data due to database error')
    return NextResponse.json({ categories: FALLBACK_CATEGORIES })
  }
}
