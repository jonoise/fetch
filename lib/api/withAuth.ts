import { Session } from 'next-auth'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
interface WithAuthHandler {
  (params: {
    req: Request
    params: Record<string, string | string[]> | undefined
  }): Promise<Response>
}

export const withAuth =
  (handler: WithAuthHandler) =>
  async (
    req: Request,
    { params }: { params: Record<string, string> | undefined }
  ) => {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_URL!,
      token: process.env.UPSTASH_REDIS_TOKEN!,
    })
    // Rate limiter 100 requests cada 10 segundos
    const ratelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(100, '10s'),
    })

    const identifier = 'api'
    const result = await ratelimit.limit(identifier)

    if (!result.success) {
      return NextResponse.json(
        {
          type: 'rate_limit',
          message: 'El rate de peticiones fue excedido. Intenta de nuevo',
          documentation_url: 'https://territorios.fetchcr.com/docs/errors',
        },
        { status: 429 }
      )
    }

    return handler({ req, params })
  }
