import { NextResponse } from 'next/server'
import { stateList, cityMap, countyMap } from '../_data/codificacion'
import { withAuth } from '@/lib/api/withAuth'
import { getClient } from '@umami/api-client'
import { defaultPayload } from '@/lib/events/api'

export const GET = withAuth(async ({ req }) => {
  const client = getClient({
    apiEndpoint: process.env.UMAMI_API_CLIENT_ENDPOINT,
    apiKey: process.env.UMAMI_API_KEY,
  })

  client.send({
    type: 'event',
    payload: {
      ...defaultPayload,
      data: req.headers,
    },
  })
  return NextResponse.json(
    { provincias: stateList, cantones: cityMap, distritos: countyMap },
    { status: 200 }
  )
})
