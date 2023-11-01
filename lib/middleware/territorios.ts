// import { getToken } from 'next-auth/jwt'
// import { parseRequest } from './utils'
import { NextRequest, NextResponse } from 'next/server'
import { parseRequest } from './utils'

export default async function TerritoriosMiddleware(req: NextRequest) {
  const { path } = parseRequest(req)

  return NextResponse.rewrite(new URL(`/territorios${path}`, req.url))
}
