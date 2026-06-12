import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')

    if (!categoryId) {
      return NextResponse.json(
        { error: 'categoryId é obrigatório' },
        { status: 400 }
      )
    }

    const questions = await db.quizQuestion.findMany({
      where: { categoryId },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        categoryId: true,
        question: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
        difficulty: true,
        order: true,
      },
    })

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('Fetch questions error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar questões' },
      { status: 500 }
    )
  }
}
