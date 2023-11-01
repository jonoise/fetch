export const HOME_HOSTNAMES = new Set([
  'fetchcr.com',
  'test.com:3000',
  'app-fetchcr.vercel.app',
])

export const isProd = process.env.NODE_ENV === 'production'
export const isTest = true

export const host = isProd
  ? 'fetchcr.com'
  : isTest
  ? 'test.com:3000'
  : 'localhost:3000'

export const protocol = isProd ? 'https' : 'http'

export const fullHost = `${protocol}://${host}`

export const TERRITORIOS_URL = `${protocol}://territorios.${host}`
