import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Fallback questions WITH correctAnswer and explanation (needed for score calculation)
const FALLBACK_QUESTIONS = [
  // Cat 1 - Hospedagem no Brasil
  { id: 'q1', categoryId: 'cat1', question: 'Quantos estabelecimentos de hospedagem o Brasil possuía em 2016?', optionA: '21.500', optionB: '31.299', optionC: '41.000', optionD: '25.800', correctAnswer: 'B', explanation: 'Segundo a Pesquisa de Serviços de Hospedagem do IBGE 2016, o Brasil possuía 31.299 estabelecimentos de hospedagem.', difficulty: 'easy', order: 1 },
  { id: 'q2', categoryId: 'cat1', question: 'Qual região possuía o maior número de estabelecimentos de hospedagem em 2016?', optionA: 'Nordeste', optionB: 'Sudeste', optionC: 'Sul', optionD: 'Norte', correctAnswer: 'B', explanation: 'O Sudeste liderava com São Paulo (5.858), Rio de Janeiro (2.680) e Minas Gerais (3.867), totalizando a maior concentração do país.', difficulty: 'easy', order: 2 },
  { id: 'q3', categoryId: 'cat1', question: 'Qual estado tinha menos estabelecimentos de hospedagem em 2016?', optionA: 'Acre', optionB: 'Roraima', optionC: 'Amapá', optionD: 'Tocantins', correctAnswer: 'B', explanation: 'Roraima tinha apenas 60 estabelecimentos de hospedagem, a menor quantidade entre todos os estados.', difficulty: 'medium', order: 3 },
  { id: 'q4', categoryId: 'cat1', question: 'Em 2016, o Brasil possuía quantos leitos no total?', optionA: '1.507.892', optionB: '2.407.892', optionC: '3.000.000', optionD: '1.800.000', correctAnswer: 'B', explanation: 'O Brasil possuía 2.407.892 leitos em estabelecimentos de hospedagem segundo o IBGE 2016.', difficulty: 'medium', order: 4 },
  { id: 'q5', categoryId: 'cat1', question: 'Quantas unidades habitacionais adaptadas existiam no Brasil em 2016?', optionA: '45.543', optionB: '12.000', optionC: '22.543', optionD: '8.300', correctAnswer: 'C', explanation: 'O Brasil possuía 22.543 unidades habitacionais adaptadas para pessoas com deficiência em 2016.', difficulty: 'hard', order: 5 },
  // Cat 2 - Tipos
  { id: 'q6', categoryId: 'cat2', question: 'Qual tipo de estabelecimento era o mais comum no Brasil em 2016?', optionA: 'Pousadas', optionB: 'Hotéis', optionC: 'Motéis', optionD: 'Hostels', correctAnswer: 'B', explanation: 'Os hotéis eram o tipo mais comum com 15.005 estabelecimentos, representando quase metade do total.', difficulty: 'easy', order: 1 },
  { id: 'q7', categoryId: 'cat2', question: 'Quantos hostels/albergues turísticos existiam no Brasil em 2016?', optionA: '480', optionB: '320', optionC: '1.200', optionD: '75', correctAnswer: 'A', explanation: 'Havia 480 hostels/albergues turísticos registrados no Brasil em 2016.', difficulty: 'medium', order: 2 },
  { id: 'q8', categoryId: 'cat2', question: 'O estado da Bahia possuía mais pousadas do que hotéis em 2016?', optionA: 'Sim, 1.275 pousadas contra 972 hotéis', optionB: 'Não, hotéis eram maioria', optionC: 'Empataram em número', optionD: 'Não havia pousadas na Bahia', correctAnswer: 'A', explanation: 'Na Bahia, pousadas (1.275) superavam hotéis (972), refletindo a forte vocação turística do estado.', difficulty: 'medium', order: 3 },
  { id: 'q9', categoryId: 'cat2', question: 'Qual estado possuía mais apart-hotéis/flats em 2016?', optionA: 'São Paulo', optionB: 'Rio de Janeiro', optionC: 'Minas Gerais', optionD: 'Bahia', correctAnswer: 'A', explanation: 'São Paulo liderava com 135 apart-hotéis/flats, seguido pelo Rio de Janeiro com 33.', difficulty: 'hard', order: 4 },
  { id: 'q10', categoryId: 'cat2', question: 'Quantos motéis existiam no Brasil em 2016?', optionA: '2.100', optionB: '4.460', optionC: '3.500', optionD: '1.800', correctAnswer: 'B', explanation: 'O Brasil possuía 4.460 motéis em 2016, sendo o terceiro tipo mais comum de estabelecimento.', difficulty: 'medium', order: 5 },
  // Cat 3 - Capacidade e Leitos
  { id: 'q11', categoryId: 'cat3', question: 'Quantas unidades habitacionais o Brasil possuía em 2016?', optionA: '500.000', optionB: '1.011.254', optionC: '750.000', optionD: '2.000.000', correctAnswer: 'B', explanation: 'O Brasil possuía 1.011.254 unidades habitacionais em estabelecimentos de hospedagem em 2016.', difficulty: 'easy', order: 1 },
  { id: 'q12', categoryId: 'cat3', question: 'Qual capital possuía mais leitos em 2016?', optionA: 'Rio de Janeiro', optionB: 'São Paulo', optionC: 'Salvador', optionD: 'Brasília', correctAnswer: 'B', explanation: 'São Paulo possuía 124.794 leitos, seguido pelo Rio de Janeiro com 83.070.', difficulty: 'easy', order: 2 },
  { id: 'q13', categoryId: 'cat3', question: 'No Brasil, leitos duplos eram mais numerosos que leitos simples?', optionA: 'Sim, 1.376.692 contra 1.031.200', optionB: 'Não, leitos simples eram mais', optionC: 'Eram iguais', optionD: 'Não há dados de leitos simples', correctAnswer: 'A', explanation: 'Leitos duplos (1.376.692) superavam leitos simples (1.031.200), mostrando preferência por acomodações para casais.', difficulty: 'medium', order: 3 },
  { id: 'q14', categoryId: 'cat3', question: 'Quantos estabelecimentos com 100 ou mais UHs existiam no Brasil?', optionA: '500', optionB: '1.526', optionC: '3.000', optionD: '800', correctAnswer: 'B', explanation: '1.526 estabelecimentos possuíam 100 ou mais unidades habitacionais em 2016.', difficulty: 'hard', order: 4 },
  { id: 'q15', categoryId: 'cat3', question: 'Qual estado tinha mais unidades habitacionais em 2016?', optionA: 'Rio de Janeiro', optionB: 'Minas Gerais', optionC: 'São Paulo', optionD: 'Bahia', correctAnswer: 'C', explanation: 'São Paulo liderava com 215.674 unidades habitacionais, seguido por Minas Gerais com 111.565.', difficulty: 'easy', order: 5 },
  // Cat 4 - Categorias
  { id: 'q16', categoryId: 'cat4', question: 'Qual era a categoria mais comum entre os estabelecimentos com 5+ funcionários?', optionA: 'Luxo', optionB: 'Econômico', optionC: 'Turístico', optionD: 'Simples', correctAnswer: 'C', explanation: 'A categoria turístico/médio conforto era a mais comum com 6.284 estabelecimentos.', difficulty: 'easy', order: 1 },
  { id: 'q17', categoryId: 'cat4', question: 'Quantos hotéis de luxo existiam no Brasil em 2016?', optionA: '666', optionB: '1.200', optionC: '350', optionD: '89', correctAnswer: 'A', explanation: 'Havia 666 estabelecimentos de categoria luxo no Brasil em 2016.', difficulty: 'medium', order: 2 },
  { id: 'q18', categoryId: 'cat4', question: 'Qual estado possuía mais hotéis de luxo em 2016?', optionA: 'Rio de Janeiro', optionB: 'São Paulo', optionC: 'Bahia', optionD: 'Minas Gerais', correctAnswer: 'B', explanation: 'São Paulo liderava com 134 estabelecimentos de luxo, seguido por Rio de Janeiro (61) e Minas Gerais (83).', difficulty: 'medium', order: 3 },
  { id: 'q19', categoryId: 'cat4', question: 'Na categoria econômico, qual estado liderava em número de estabelecimentos?', optionA: 'Bahia', optionB: 'São Paulo', optionC: 'Minas Gerais', optionD: 'Rio de Janeiro', correctAnswer: 'B', explanation: 'São Paulo liderava na categoria econômico com 1.184 estabelecimentos, seguido por Minas Gerais com 686.', difficulty: 'hard', order: 4 },
  { id: 'q20', categoryId: 'cat4', question: 'Estabelecimentos de categoria simples representavam quantos do total?', optionA: '1.500', optionB: '5.626', optionC: '2.736', optionD: '4.000', correctAnswer: 'C', explanation: '2.736 estabelecimentos eram classificados como categoria simples em 2016.', difficulty: 'medium', order: 5 },
  // Cat 5 - Redes e Cadeias
  { id: 'q21', categoryId: 'cat5', question: 'Qual porcentagem dos estabelecimentos era independente em 2016?', optionA: '50%', optionB: '72%', optionC: '92%', optionD: '85%', correctAnswer: 'C', explanation: '15.687 de 17.011 estabelecimentos eram independentes, representando cerca de 92% do total.', difficulty: 'medium', order: 1 },
  { id: 'q22', categoryId: 'cat5', question: 'Quantos estabelecimentos integravam cadeias internacionais de hotéis?', optionA: '276', optionB: '500', optionC: '1.048', optionD: '150', correctAnswer: 'A', explanation: '276 estabelecimentos integravam cadeias internacionais de hotéis em 2016.', difficulty: 'easy', order: 2 },
  { id: 'q23', categoryId: 'cat5', question: 'Qual estado possuía mais estabelecimentos de cadeias internacionais?', optionA: 'Rio de Janeiro', optionB: 'São Paulo', optionC: 'Bahia', optionD: 'Minas Gerais', correctAnswer: 'B', explanation: 'São Paulo liderava com 75 estabelecimentos de cadeias internacionais, seguido por Rio de Janeiro com 41.', difficulty: 'hard', order: 3 },
  { id: 'q24', categoryId: 'cat5', question: 'Quantos estabelecimentos faziam parte de cadeias nacionais?', optionA: '2.500', optionB: '500', optionC: '1.048', optionD: '3.200', correctAnswer: 'C', explanation: '1.048 estabelecimentos integravam cadeias nacionais de hotéis em 2016.', difficulty: 'medium', order: 4 },
  { id: 'q25', categoryId: 'cat5', question: 'Em Roraima, todos os estabelecimentos eram independentes?', optionA: 'Sim, 100% independentes', optionB: 'Não, havia cadeias nacionais', optionC: 'Não, havia cadeias internacionais', optionD: 'Havia tanto nacionais quanto internacionais', correctAnswer: 'A', explanation: 'Roraima possuía 35 estabelecimentos, todos independentes, sem nenhuma cadeia nacional ou internacional.', difficulty: 'hard', order: 5 },
  // Cat 6 - Localização
  { id: 'q26', categoryId: 'cat6', question: 'A maioria dos estabelecimentos estava localizada em qual zona?', optionA: 'Zona urbana/centro', optionB: 'Zona urbana/fora do centro', optionC: 'Orla marítima', optionD: 'Zona rural', correctAnswer: 'A', explanation: '7.272 estabelecimentos estavam na zona urbana/centro da cidade, a localização mais comum.', difficulty: 'easy', order: 1 },
  { id: 'q27', categoryId: 'cat6', question: 'Quantos estabelecimentos estavam localizados em orla marítima/praia/ilha?', optionA: '500', optionB: '2.194', optionC: '4.000', optionD: '1.000', correctAnswer: 'B', explanation: '2.194 estabelecimentos estavam localizados em orla marítima/praia/ilha, concentrados principalmente no Nordeste.', difficulty: 'medium', order: 2 },
  { id: 'q28', categoryId: 'cat6', question: 'Qual estado tinha mais estabelecimentos em zona rural/reserva ambiental?', optionA: 'Minas Gerais', optionB: 'São Paulo', optionC: 'Goiás', optionD: 'Mato Grosso', correctAnswer: 'B', explanation: 'São Paulo liderava com 393 estabelecimentos em zona rural, seguido por Minas Gerais com 290.', difficulty: 'hard', order: 3 },
  { id: 'q29', categoryId: 'cat6', question: 'No Ceará, qual localização era mais comum para estabelecimentos?', optionA: 'Urbana/centro', optionB: 'Urbana/fora do centro', optionC: 'Orla marítima', optionD: 'Zona rural', correctAnswer: 'C', explanation: 'No Ceará, 194 estabelecimentos estavam em orla marítima, seguido por urbana/fora do centro (168) e urbana/centro (139).', difficulty: 'hard', order: 4 },
  { id: 'q30', categoryId: 'cat6', question: 'Minas Gerais tinha estabelecimentos em orla marítima em 2016?', optionA: 'Sim, mais de 100', optionB: 'Sim, poucos', optionC: 'Não, zero estabelecimentos', optionD: 'Sim, cerca de 50', correctAnswer: 'C', explanation: 'Minas Gerais, por ser um estado sem litoral, tinha zero estabelecimentos em orla marítima/praia/ilha.', difficulty: 'easy', order: 5 },
]

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

    // Try to fetch questions from database
    let questions: typeof FALLBACK_QUESTIONS = []
    let usedFallback = false

    try {
      const dbQuestions = await db.quizQuestion.findMany({
        where: { categoryId },
        orderBy: { order: 'asc' },
      })

      if (dbQuestions.length > 0) {
        questions = dbQuestions
      } else {
        console.warn(`[API /quiz/submit] Database returned empty for categoryId=${categoryId}, using fallback data`)
        questions = FALLBACK_QUESTIONS.filter((q) => q.categoryId === categoryId)
        usedFallback = true
      }
    } catch (dbError) {
      console.error('[API /quiz/submit] Database query failed for questions:', dbError)
      if (dbError instanceof Error) {
        console.error('[API /quiz/submit] DB Error name:', dbError.name)
        console.error('[API /quiz/submit] DB Error message:', dbError.message)
        console.error('[API /quiz/submit] DB Error stack:', dbError.stack)
      }
      questions = FALLBACK_QUESTIONS.filter((q) => q.categoryId === categoryId)
      usedFallback = true
      console.warn(`[API /quiz/submit] Using fallback questions for categoryId=${categoryId}`)
    }

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

    // Try to save the attempt to the database
    let attempt
    try {
      attempt = await db.quizAttempt.create({
        data: {
          userId,
          categoryId,
          score,
          totalQuestions: questions.length,
          answers: JSON.stringify(answers),
        },
      })
    } catch (dbError) {
      console.error('[API /quiz/submit] Failed to save attempt to database:', dbError)
      if (dbError instanceof Error) {
        console.error('[API /quiz/submit] Save attempt error name:', dbError.name)
        console.error('[API /quiz/submit] Save attempt error message:', dbError.message)
        console.error('[API /quiz/submit] Save attempt error stack:', dbError.stack)
      }
      // Return a mock attempt object since we can't save to DB
      attempt = {
        id: `fallback_attempt_${Date.now()}`,
        userId,
        categoryId,
        score,
        totalQuestions: questions.length,
        timeTaken: 0,
        answers: JSON.stringify(answers),
        completedAt: new Date(),
      }
      console.warn('[API /quiz/submit] Returning mock attempt object (DB save failed)')
    }

    if (usedFallback) {
      console.info(`[API /quiz/submit] Score: ${score}/${questions.length} (used fallback questions)`)
    }

    return NextResponse.json({ attempt, results })
  } catch (error) {
    console.error('[API /quiz/submit] Submit quiz error:', error)
    if (error instanceof Error) {
      console.error('[API /quiz/submit] Error name:', error.name)
      console.error('[API /quiz/submit] Error message:', error.message)
      console.error('[API /quiz/submit] Error stack:', error.stack)
    }
    return NextResponse.json(
      { error: 'Erro ao enviar respostas' },
      { status: 500 }
    )
  }
}
