import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// IDs dos usuários de seed (dados falsos) — não devem aparecer no ranking
const SEED_USER_IDS = ['user_admin', 'user_maria', 'user_joao', 'user_ana', 'user_carlos']

export async function GET() {
  try {
    // Buscar tentativas EXCLUINDO usuários de seed (dados falsos do SQL)
    // Usuários reais criados pelo registro têm IDs no formato cuid() (ex: "clxxxx...")
    const attempts = await db.quizAttempt.findMany({
      where: {
        userId: {
          notIn: SEED_USER_IDS,
        },
      },
      orderBy: [
        { score: 'desc' },
        { completedAt: 'desc' },
      ],
      include: {
        user: {
          select: { name: true },
        },
        category: {
          select: { name: true },
        },
      },
    })

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

    // Ranking mostra APENAS usuários reais que fizeram login e completaram o quiz
    return NextResponse.json({ ranking })
  } catch (error) {
    console.error('[API /quiz/ranking] Fetch ranking error:', error)
    if (error instanceof Error) {
      console.error('[API /quiz/ranking] Error name:', error.name)
      console.error('[API /quiz/ranking] Error message:', error.message)
      console.error('[API /quiz/ranking] Error stack:', error.stack)
    }
    // Retorna lista vazia em caso de erro — sem dados falsos
    return NextResponse.json({ ranking: [] })
  }
}
