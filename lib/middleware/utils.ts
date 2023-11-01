import { NextRequest } from 'next/server'
import { HOME_HOSTNAMES, host } from '../constants/global'

export const parseRequest = (req: NextRequest) => {
  let domain = req.headers.get('host')!
  domain = domain.replace('www.', '') // remove www. from domain
  if (HOME_HOSTNAMES.has(domain)) domain = host
  const path = req.nextUrl.pathname
  return { domain, path }
}
