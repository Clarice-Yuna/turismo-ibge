import { NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { db } from '@/lib/db'

const hash = (p: string) => createHash('sha256').update(p).digest('hex')

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, email, password } = body

    if (action === 'login') {
      if (!email || !password) {
        return NextResponse.json(
          { error: 'Email e senha são obrigatórios' },
          { status: 400 }
        )
      }

      const user = await db.user.findUnique({
        where: { email },
      })

      if (!user || user.password !== hash(password)) {
        return NextResponse.json(
          { error: 'Email ou senha inválidos' },
          { status: 401 }
        )
      }

      const { password: _, ...userWithoutPassword } = user
      return NextResponse.json({ user: userWithoutPassword })
    }

    return NextResponse.json(
      { error: 'Ação inválida' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
