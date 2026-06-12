import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

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
  } catch (error) {
    console.error('Fetch ranking error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar ranking' },
      { status: 500 }
    )
  }
}
