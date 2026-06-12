import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

const FALLBACK_RANKING = [
  {
    id: 'att3',
    userName: 'Ana Oliveira',
    categoryName: 'Tipos de Estabelecimentos',
    score: 5,
    totalQuestions: 5,
    percentage: 100,
    completedAt: '2024-01-15T10:30:00.000Z',
  },
  {
    id: 'att7',
    userName: 'Ana Oliveira',
    categoryName: 'Localização Geográfica',
    score: 5,
    totalQuestions: 5,
    percentage: 100,
    completedAt: '2024-01-15T14:20:00.000Z',
  },
  {
    id: 'att5',
    userName: 'Maria Silva',
    categoryName: 'Categorias e Classificação',
    score: 4,
    totalQuestions: 5,
    percentage: 80,
    completedAt: '2024-01-14T16:45:00.000Z',
  },
  {
    id: 'att1',
    userName: 'Maria Silva',
    categoryName: 'Hospedagem no Brasil',
    score: 4,
    totalQuestions: 5,
    percentage: 80,
    completedAt: '2024-01-14T09:00:00.000Z',
  },
  {
    id: 'att8',
    userName: 'Carlos Pereira',
    categoryName: 'Hospedagem no Brasil',
    score: 4,
    totalQuestions: 5,
    percentage: 80,
    completedAt: '2024-01-13T11:15:00.000Z',
  },
  {
    id: 'att2',
    userName: 'João Santos',
    categoryName: 'Hospedagem no Brasil',
    score: 3,
    totalQuestions: 5,
    percentage: 60,
    completedAt: '2024-01-13T08:30:00.000Z',
  },
  {
    id: 'att4',
    userName: 'Carlos Pereira',
    categoryName: 'Capacidade e Leitos',
    score: 3,
    totalQuestions: 5,
    percentage: 60,
    completedAt: '2024-01-12T15:00:00.000Z',
  },
  {
    id: 'att6',
    userName: 'João Santos',
    categoryName: 'Redes e Cadeias',
    score: 2,
    totalQuestions: 5,
    percentage: 40,
    completedAt: '2024-01-12T12:30:00.000Z',
  },
]

export async function GET() {
  try {
    const attempts = await db.quizAttempt.findMany({
      orderBy: { score: 'desc' },
      include: {
        user: {
          select: { name: true },
        },
        category: {
          select: { name: true },
        },
      },
    })

    if (attempts.length > 0) {
      const ranking = attempts.map((attempt) => ({
        id: attempt.id,
        userName: attempt.user.name,
        categoryName: attempt.category.name,
        score: attempt.score,
        totalQuestions: attempt.totalQuestions,
        percentage:
          attempt.totalQuestions > 0
            ? Math.round((attempt.score / attempt.totalQuestions) * 100)
            : 0,
        completedAt: attempt.completedAt,
      }))
      return NextResponse.json({ ranking })
    }

    console.warn('[API /quiz/ranking] Database returned empty, using fallback data')
    return NextResponse.json({ ranking: FALLBACK_RANKING })
  } catch (error) {
    console.error('[API /quiz/ranking] Fetch ranking error:', error)
    if (error instanceof Error) {
      console.error('[API /quiz/ranking] Error name:', error.name)
      console.error('[API /quiz/ranking] Error message:', error.message)
      console.error('[API /quiz/ranking] Error stack:', error.stack)
    }
    console.warn('[API /quiz/ranking] Returning fallback data due to database error')
    return NextResponse.json({ ranking: FALLBACK_RANKING })
  }
}
