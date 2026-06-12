import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [
      estabPorTipo,
      estabPorGrupoUH,
      uhLeitosUF,
      capitais,
      estabPorCategoria,
      estabPorCaracteristica,
      estabPorLocalizacao,
    ] = await Promise.all([
      db.estabPorTipo.findMany({ orderBy: { uf: 'asc' } }),
      db.estabPorGrupoUH.findMany({ orderBy: { uf: 'asc' } }),
      db.uHLeitosUF.findMany({ orderBy: { uf: 'asc' } }),
      db.capitais.findMany({ orderBy: { capital: 'asc' } }),
      db.estabPorCategoria.findMany({ orderBy: { uf: 'asc' } }),
      db.estabPorCaracteristica.findMany({ orderBy: { uf: 'asc' } }),
      db.estabPorLocalizacao.findMany({ orderBy: { uf: 'asc' } }),
    ])

    return NextResponse.json({
      estabPorTipo,
      estabPorGrupoUH,
      uhLeitosUF,
      capitais,
      estabPorCategoria,
      estabPorCaracteristica,
      estabPorLocalizacao,
    })
  } catch (error) {
    console.error('Fetch dashboard data error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar dados do dashboard' },
      { status: 500 }
    )
  }
}
