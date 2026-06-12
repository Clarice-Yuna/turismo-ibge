import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, categoryId, answers } = body as {
      userId: string
      categoryId: string
      answers: { questionId: string; selectedAnswer: string }[]
    }

    if (!userId || !categoryId || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'userId, categoryId e answers são obrigatórios' },
        { status: 400 }
      )
    }

    // Fetch all questions for the category
    const questions = await db.quizQuestion.findMany({
      where: { categoryId },
      orderBy: { order: 'asc' },
    })

    // Calculate score and build results
    let score = 0
    const results = questions.map((question) => {
      const userAnswer = answers.find((a) => a.questionId === question.id)
      const selectedAnswer = userAnswer?.selectedAnswer ?? ''
      const correct = selectedAnswer === question.correctAnswer
      if (correct) score++

      return {
        questionId: question.id,
        correct,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      }
    })

    // Save the attempt
    const attempt = await db.quizAttempt.create({
      data: {
        userId,
        categoryId,
        score,
        totalQuestions: questions.length,
        answers: JSON.stringify(answers),
      },
    })

    return NextResponse.json({ attempt, results })
  } catch (error) {
    console.error('Submit quiz error:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar respostas' },
      { status: 500 }
    )
  }
}
