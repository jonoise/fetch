import { NextRequest, NextResponse } from 'next/server'
import { cityMap, stateList } from '@/app/territorios/_data/codificacion'
import { withAuth } from '@/lib/api/withAuth'

type Context = {
  params: {
    provinciaId: string
  }
}

const provinceIds = ['1', '2', '3', '4', '5', '6', '7']

export const GET = withAuth(async ({ params }) => {
  const { provinciaId } = params as Context['params']

  if (!provinceIds.includes(provinciaId)) {
    return NextResponse.json({ error: 'Provincia inválida' }, { status: 400 })
  }

  const cantones = cityMap[provinciaId as keyof typeof cityMap]

  return NextResponse.json(cantones, { status: 200 })
})
