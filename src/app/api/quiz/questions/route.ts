import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Fallback questions WITHOUT correctAnswer and explanation (those are only returned on submit)
const FALLBACK_QUESTIONS = [
  // Cat 1 - Hospedagem no Brasil
  { id: 'q1', categoryId: 'cat1', question: 'Quantos estabelecimentos de hospedagem o Brasil possuía em 2016?', optionA: '21.500', optionB: '31.299', optionC: '41.000', optionD: '25.800', difficulty: 'easy', order: 1 },
  { id: 'q2', categoryId: 'cat1', question: 'Qual região possuía o maior número de estabelecimentos de hospedagem em 2016?', optionA: 'Nordeste', optionB: 'Sudeste', optionC: 'Sul', optionD: 'Norte', difficulty: 'easy', order: 2 },
  { id: 'q3', categoryId: 'cat1', question: 'Qual estado tinha menos estabelecimentos de hospedagem em 2016?', optionA: 'Acre', optionB: 'Roraima', optionC: 'Amapá', optionD: 'Tocantins', difficulty: 'medium', order: 3 },
  { id: 'q4', categoryId: 'cat1', question: 'Em 2016, o Brasil possuía quantos leitos no total?', optionA: '1.507.892', optionB: '2.407.892', optionC: '3.000.000', optionD: '1.800.000', difficulty: 'medium', order: 4 },
  { id: 'q5', categoryId: 'cat1', question: 'Quantas unidades habitacionais adaptadas existiam no Brasil em 2016?', optionA: '45.543', optionB: '12.000', optionC: '22.543', optionD: '8.300', difficulty: 'hard', order: 5 },
  // Cat 2 - Tipos
  { id: 'q6', categoryId: 'cat2', question: 'Qual tipo de estabelecimento era o mais comum no Brasil em 2016?', optionA: 'Pousadas', optionB: 'Hotéis', optionC: 'Motéis', optionD: 'Hostels', difficulty: 'easy', order: 1 },
  { id: 'q7', categoryId: 'cat2', question: 'Quantos hostels/albergues turísticos existiam no Brasil em 2016?', optionA: '480', optionB: '320', optionC: '1.200', optionD: '75', difficulty: 'medium', order: 2 },
  { id: 'q8', categoryId: 'cat2', question: 'O estado da Bahia possuía mais pousadas do que hotéis em 2016?', optionA: 'Sim, 1.275 pousadas contra 972 hotéis', optionB: 'Não, hotéis eram maioria', optionC: 'Empataram em número', optionD: 'Não havia pousadas na Bahia', difficulty: 'medium', order: 3 },
  { id: 'q9', categoryId: 'cat2', question: 'Qual estado possuía mais apart-hotéis/flats em 2016?', optionA: 'São Paulo', optionB: 'Rio de Janeiro', optionC: 'Minas Gerais', optionD: 'Bahia', difficulty: 'hard', order: 4 },
  { id: 'q10', categoryId: 'cat2', question: 'Quantos motéis existiam no Brasil em 2016?', optionA: '2.100', optionB: '4.460', optionC: '3.500', optionD: '1.800', difficulty: 'medium', order: 5 },
  // Cat 3 - Capacidade e Leitos
  { id: 'q11', categoryId: 'cat3', question: 'Quantas unidades habitacionais o Brasil possuía em 2016?', optionA: '500.000', optionB: '1.011.254', optionC: '750.000', optionD: '2.000.000', difficulty: 'easy', order: 1 },
  { id: 'q12', categoryId: 'cat3', question: 'Qual capital possuía mais leitos em 2016?', optionA: 'Rio de Janeiro', optionB: 'São Paulo', optionC: 'Salvador', optionD: 'Brasília', difficulty: 'easy', order: 2 },
  { id: 'q13', categoryId: 'cat3', question: 'No Brasil, leitos duplos eram mais numerosos que leitos simples?', optionA: 'Sim, 1.376.692 contra 1.031.200', optionB: 'Não, leitos simples eram mais', optionC: 'Eram iguais', optionD: 'Não há dados de leitos simples', difficulty: 'medium', order: 3 },
  { id: 'q14', categoryId: 'cat3', question: 'Quantos estabelecimentos com 100 ou mais UHs existiam no Brasil?', optionA: '500', optionB: '1.526', optionC: '3.000', optionD: '800', difficulty: 'hard', order: 4 },
  { id: 'q15', categoryId: 'cat3', question: 'Qual estado tinha mais unidades habitacionais em 2016?', optionA: 'Rio de Janeiro', optionB: 'Minas Gerais', optionC: 'São Paulo', optionD: 'Bahia', difficulty: 'easy', order: 5 },
  // Cat 4 - Categorias
  { id: 'q16', categoryId: 'cat4', question: 'Qual era a categoria mais comum entre os estabelecimentos com 5+ funcionários?', optionA: 'Luxo', optionB: 'Econômico', optionC: 'Turístico', optionD: 'Simples', difficulty: 'easy', order: 1 },
  { id: 'q17', categoryId: 'cat4', question: 'Quantos hotéis de luxo existiam no Brasil em 2016?', optionA: '666', optionB: '1.200', optionC: '350', optionD: '89', difficulty: 'medium', order: 2 },
  { id: 'q18', categoryId: 'cat4', question: 'Qual estado possuía mais hotéis de luxo em 2016?', optionA: 'Rio de Janeiro', optionB: 'São Paulo', optionC: 'Bahia', optionD: 'Minas Gerais', difficulty: 'medium', order: 3 },
  { id: 'q19', categoryId: 'cat4', question: 'Na categoria econômico, qual estado liderava em número de estabelecimentos?', optionA: 'Bahia', optionB: 'São Paulo', optionC: 'Minas Gerais', optionD: 'Rio de Janeiro', difficulty: 'hard', order: 4 },
  { id: 'q20', categoryId: 'cat4', question: 'Estabelecimentos de categoria simples representavam quantos do total?', optionA: '1.500', optionB: '5.626', optionC: '2.736', optionD: '4.000', difficulty: 'medium', order: 5 },
  // Cat 5 - Redes e Cadeias
  { id: 'q21', categoryId: 'cat5', question: 'Qual porcentagem dos estabelecimentos era independente em 2016?', optionA: '50%', optionB: '72%', optionC: '92%', optionD: '85%', difficulty: 'medium', order: 1 },
  { id: 'q22', categoryId: 'cat5', question: 'Quantos estabelecimentos integravam cadeias internacionais de hotéis?', optionA: '276', optionB: '500', optionC: '1.048', optionD: '150', difficulty: 'easy', order: 2 },
  { id: 'q23', categoryId: 'cat5', question: 'Qual estado possuía mais estabelecimentos de cadeias internacionais?', optionA: 'Rio de Janeiro', optionB: 'São Paulo', optionC: 'Bahia', optionD: 'Minas Gerais', difficulty: 'hard', order: 3 },
  { id: 'q24', categoryId: 'cat5', question: 'Quantos estabelecimentos faziam parte de cadeias nacionais?', optionA: '2.500', optionB: '500', optionC: '1.048', optionD: '3.200', difficulty: 'medium', order: 4 },
  { id: 'q25', categoryId: 'cat5', question: 'Em Roraima, todos os estabelecimentos eram independentes?', optionA: 'Sim, 100% independentes', optionB: 'Não, havia cadeias nacionais', optionC: 'Não, havia cadeias internacionais', optionD: 'Havia tanto nacionais quanto internacionais', difficulty: 'hard', order: 5 },
  // Cat 6 - Localização
  { id: 'q26', categoryId: 'cat6', question: 'A maioria dos estabelecimentos estava localizada em qual zona?', optionA: 'Zona urbana/centro', optionB: 'Zona urbana/fora do centro', optionC: 'Orla marítima', optionD: 'Zona rural', difficulty: 'easy', order: 1 },
  { id: 'q27', categoryId: 'cat6', question: 'Quantos estabelecimentos estavam localizados em orla marítima/praia/ilha?', optionA: '500', optionB: '2.194', optionC: '4.000', optionD: '1.000', difficulty: 'medium', order: 2 },
  { id: 'q28', categoryId: 'cat6', question: 'Qual estado tinha mais estabelecimentos em zona rural/reserva ambiental?', optionA: 'Minas Gerais', optionB: 'São Paulo', optionC: 'Goiás', optionD: 'Mato Grosso', difficulty: 'hard', order: 3 },
  { id: 'q29', categoryId: 'cat6', question: 'No Ceará, qual localização era mais comum para estabelecimentos?', optionA: 'Urbana/centro', optionB: 'Urbana/fora do centro', optionC: 'Orla marítima', optionD: 'Zona rural', difficulty: 'hard', order: 4 },
  { id: 'q30', categoryId: 'cat6', question: 'Minas Gerais tinha estabelecimentos em orla marítima em 2016?', optionA: 'Sim, mais de 100', optionB: 'Sim, poucos', optionC: 'Não, zero estabelecimentos', optionD: 'Sim, cerca de 50', difficulty: 'easy', order: 5 },
]

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

    if (questions.length > 0) {
      return NextResponse.json({ questions })
    }

    console.warn(`[API /quiz/questions] Database returned empty for categoryId=${categoryId}, using fallback data`)
    const filtered = FALLBACK_QUESTIONS.filter((q) => q.categoryId === categoryId)
    return NextResponse.json({ questions: filtered })
  } catch (error) {
    console.error('[API /quiz/questions] Fetch questions error:', error)
    if (error instanceof Error) {
      console.error('[API /quiz/questions] Error name:', error.name)
      console.error('[API /quiz/questions] Error message:', error.message)
      console.error('[API /quiz/questions] Error stack:', error.stack)
    }
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    if (!categoryId) {
      return NextResponse.json(
        { error: 'categoryId é obrigatório' },
        { status: 400 }
      )
    }
    const filtered = FALLBACK_QUESTIONS.filter((q) => q.categoryId === categoryId)
    console.warn(`[API /quiz/questions] Returning fallback data for categoryId=${categoryId} due to database error`)
    return NextResponse.json({ questions: filtered })
  }
}
