import { NextResponse } from 'next/server'
import { cityMap } from '@/app/territorios/_data/codificacion'
import { withAuth } from '@/lib/api/withAuth'

export const GET = withAuth(async ({ req }) => {
  return NextResponse.json(cityMap, { status: 200 })
})
