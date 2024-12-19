import cors from 'cors'
import path from 'path'
import morgan from 'morgan'
import express from 'express'
import useragent from 'express-useragent'
import { RedisStore } from 'connect-redis'
import session from 'express-session'

import { connectMongo } from './mongo'
import { redisConnect } from './redis'
import passport from './passport'

// Initialize store.
export const config = async (app: express.Application) => {
  app
  app
    //  .set('trust proxy', true) //IP Trust the proxy

    .use(cors())
    .use(morgan('dev'))
    .use(express.json())
  app
    .use(
      session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false, // Avoid creating empty sessions
        store: new RedisStore({
          client: redisConnect,
          prefix: 'shorten:',
        }),
        cookie: {
          httpOnly: true,
          secure: false,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          sameSite: 'lax', // Allow redirects
        }, // 7 days
      }),
    )
    .use(useragent.express())

    .use(express.urlencoded({ extended: true }))
    .use(passport.initialize())
    .get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../../public/index.html'))
    })
    .get('/health', (req, res) => {
      return res.status(200).send()
    })

  await connectMongo()
}
