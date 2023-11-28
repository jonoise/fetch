import { NextResponse } from 'next/server'
import { stateList, cityMap, countyMap } from '../_data/codificacion'
import { withAuth } from '@/lib/api/withAuth'
import { getClient } from '@umami/api-client'
import { defaultPayload } from '@/lib/events/api'

export const GET = withAuth(async ({ req }) => {
  try {
    const client = getClient({
      apiEndpoint: process.env.UMAMI_API_CLIENT_ENDPOINT,
      apiKey: process.env.UMAMI_API_KEY,
    })

    const { ok, status, data, error } = await client.send({
      type: 'event',
      payload: {
        ...defaultPayload,
        data: req.headers,
      },
    })

    console.log({
      ok,
      status,
      data,
      error,
    })
    return NextResponse.json(
      { provincias: stateList, cantones: cityMap, distritos: countyMap },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
})
