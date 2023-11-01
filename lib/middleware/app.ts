// import { getToken } from 'next-auth/jwt'
// import { parseRequest } from './utils'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { parseRequest } from './utils'
import { fullHost } from '../constants/global'

export default async function AppMiddleware(req: NextRequest) {
  const { path } = parseRequest(req)
  const token = await getToken({ req, secret: process.env.SECRET })
  if (!token) {
    return NextResponse.redirect(new URL(`${fullHost}/login`, req.url))
  }

  return NextResponse.rewrite(new URL(`/app${path}`, req.url))
}
