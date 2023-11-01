// import { getToken } from 'next-auth/jwt'
// import { parseRequest } from './utils'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { parseRequest } from './utils'
import { host, protocol } from '../constants/global'

export default async function HomeMiddleware(req: NextRequest) {
  const { path } = parseRequest(req)
  if (path === '/cuenta') {
    const token = await getToken({ req, secret: process.env.SECRET })
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
  if (path === '/register' || path === '/login') {
    const token = await getToken({ req, secret: process.env.SECRET })
    if (token) {
      return NextResponse.redirect(
        new URL(`${protocol}://app.${host}`, req.url)
      )
    }
  }
  return NextResponse.rewrite(new URL(`/home${path}`, req.url))
}
