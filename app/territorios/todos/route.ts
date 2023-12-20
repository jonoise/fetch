import { NextResponse } from 'next/server'
import { stateList, cityMap, countyMap } from '../_data/codificacion'
import { withAuth } from '@/lib/api/withAuth'

export const GET = withAuth(async ({ req }) => {
  try {
    return NextResponse.json(
      { provincias: stateList, cantones: cityMap, distritos: countyMap },
      { status: 200 }
    )
  } catch (error) {
    console.log({ error })
    return NextResponse.error()
  }
})
