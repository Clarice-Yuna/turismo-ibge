import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where = category ? { category } : {}

    const curiosities = await db.curiosity.findMany({
      where,
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ curiosities })
  } catch (error) {
    console.error('Fetch curiosities error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar curiosidades' },
      { status: 500 }
    )
  }
}
