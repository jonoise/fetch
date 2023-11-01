import { NextRequest, NextResponse } from 'next/server'
import { stateList } from '@/app/territorios/_data/codificacion'
import { withAuth } from '@/lib/api/withAuth'

export const GET = withAuth(async ({ req }) => {
  return NextResponse.json(stateList, { status: 200 })
})
