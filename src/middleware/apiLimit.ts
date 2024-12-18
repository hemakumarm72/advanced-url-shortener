import rateLimit from 'express-rate-limit'
import { RedisStore } from 'rate-limit-redis'
import { redisConnect } from './redis'
import { Request, Response } from 'express'

// Then connect to the Redis server

export const accountLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5-minute window
  max: 15, // Limit each IP to 15 requests per `window` (5 minutes)
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (command: any, ...args: any) => {
      return redisConnect.sendCommand(command, ...args) as Promise<any>
    },
  }),
  handler(req: Request, res: Response) {
    res.status(429).json({
      error: 'Too many requests',
      message: 'Try again after 5 minutes',
    })
  },
})
