import { NextRequest, NextResponse } from 'next/server'
import { countyMap } from '@/app/territorios/_data/codificacion'
import { withAuth } from '@/lib/api/withAuth'

export const GET = withAuth(async () => {
  return NextResponse.json(countyMap, { status: 200 })
})
