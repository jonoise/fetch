import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { parseRequest } from './lib/middleware/utils'
import { host } from './lib/constants/global'
import AppMiddleware from './lib/middleware/app'
import HomeMiddleware from './lib/middleware/home'
import TerritoriosMiddleware from './lib/middleware/territorios'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const { domain, path } = parseRequest(req)

  //   if (path.startsWith('/api')) {
  //     return ApiMiddleware(req)
  //   }

  if (domain === `app.${host}`) {
    return AppMiddleware(req)
  }

  if (domain === `territorios.${host}`) {
    return TerritoriosMiddleware(req)
  }

  const home = domain === host

  if (home) {
    return HomeMiddleware(req)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /examples (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     * 5. all files inside /public/placeholders (e.g. /placeholders/placeholder.png)
     * 6. all files inside /public/fabrics (e.g. /fabrics/fabric.png)
     */
    '/((?!_next/|static|api|public|default|placeholders/|fabrics/|icons/|examples/|[\\w-]+\\.\\w+).*)',
  ],
}
