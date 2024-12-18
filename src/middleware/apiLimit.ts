import rateLimit from 'express-rate-limit'
import { redisConnect } from './redis'

import { Request, Response } from 'express'
import RedisStore from 'rate-limit-redis'

// Then connect to the Redis server

export const apiLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5-minute window
  max: 100, // Limit each IP to 15 requests per `window` (5 minutes)
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
    sendCommand: (...args: string[]) => redisConnect.call(...args),
  }),
  handler(req: Request, res: Response) {
    res.status(429).json({
      error: 'Too many requests',
      message: 'Try again after 5 minutes',
    })
  },
})
