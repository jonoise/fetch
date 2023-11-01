import { NextRequest, NextResponse } from 'next/server'
import {
  cityMap,
  stateList,
  countyMap,
} from '@/app/territorios/_data/codificacion'
import { TERRITORIOS_URL } from '@/lib/constants/global'
import { withAuth } from '@/lib/api/withAuth'

type Context = {
  params: {
    location: string[]
  }
}

const provinceIds = ['1', '2', '3', '4', '5', '6', '7']

export const GET = withAuth(async ({ params }) => {
  const { location } = params as Context['params']

  if (location.length === 1) {
    const locationId = location[0]

    if (locationId.length === 3) {
      const provincia = locationId.slice(0, 1)
      const canton = locationId.slice(1, 3)
      const distritos =
        countyMap[`${provincia}${canton}` as keyof typeof countyMap]

      return NextResponse.json(distritos, { status: 200 })
    }

    return NextResponse.json(
      {
        type: `invalid_request`,
        message:
          'Se debe incluir provincia y cantón: /distritos/1/01 o /distritos/101',
        documentation: `${TERRITORIOS_URL}/docs/distritos`,
      },
      { status: 400 }
    )
  }

  if (location.length > 2) {
    return NextResponse.json(
      {
        type: `invalid_request`,
        message:
          'Se debe incluir provincia y cantón: /distritos/1/01 o /distritos/101',
        documentation: `${TERRITORIOS_URL}/docs/distritos`,
      },
      { status: 400 }
    )
  }

  const [provinciaId, cantonId] = location

  if (!provinceIds.includes(provinciaId)) {
    return NextResponse.json(
      {
        type: `invalid_request`,
        message: 'Provincia inválida',
        documentation: `${TERRITORIOS_URL}/docs/provincias`,
      },
      { status: 400 }
    )
  }

  const provincia = stateList.find((state) => state.value === provinciaId)
  const cantones = cityMap[provinciaId as keyof typeof cityMap]
  const canton = cantones.find((city) => city.value === cantonId)

  if (!canton) {
    return NextResponse.json(
      {
        type: `invalid_request`,
        message: 'Cantón inválido',
        documentation: `${TERRITORIOS_URL}/docs/cantones`,
      },
      { status: 400 }
    )
  }

  const distritos =
    countyMap[`${provincia?.value}${canton.value}` as keyof typeof countyMap]

  return NextResponse.json(distritos, { status: 200 })
})
