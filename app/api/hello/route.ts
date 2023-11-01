import { NextRequest, NextResponse } from 'next/server'
// import { Ratelimit } from '@upstash/ratelimit'
// import { Redis } from '@upstash/redis'
// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_URL!,
//   token: process.env.UPSTASH_REDIS_TOKEN!,
// })
// // Create a new ratelimiter, that allows 5 requests per 5 seconds
// const ratelimit = new Ratelimit({
//   redis: redis,
//   limiter: Ratelimit.fixedWindow(100, '24h'),
// })

// export const GET = async (req: NextRequest) => {
//   const identifier = 'api'
//   const result = await ratelimit.limit(identifier)

//   if (!result.success) {
//     return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
//   }

//   return NextResponse.json(
//     { hello: 'world' },
//     {
//       headers: {
//         'x-ratelimit-limit': `${result.limit}`,
//         'x-ratelimit-remaining': `${result.remaining}`,
//       },
//     }
//   )
// }

export const GET = async (req: NextRequest) => {
  return NextResponse.json({ hello: 'world' }, { status: 200 })
}
