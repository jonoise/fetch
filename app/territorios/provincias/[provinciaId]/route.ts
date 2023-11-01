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
    return NextResponse.json(
      {
        type: 'invalid_request',
        message: 'Provincia inválida',
        documentatio_url: 'https://territorios.fetchcr.com/docs/provincias',
      },
      { status: 400 }
    )
  }

  const provincia = stateList.find((state) => state.value === provinciaId)
  const cantones = cityMap[provinciaId as keyof typeof cityMap]

  return NextResponse.json({ provincia, cantones }, { status: 200 })
})
