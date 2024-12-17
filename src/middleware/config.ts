import cors from 'cors'
import path from 'path'
import morgan from 'morgan'
import express from 'express'
import useragent from 'express-useragent'

import { connectMongo } from './mongo'

export const config = async (app: express.Application) => {
  app
  app
    .set('trust proxy', true) //IP Trust the proxy

    .use(cors())
    .use(morgan('dev'))
    .use(express.json())
    .use(useragent.express())

    .use(express.urlencoded({ extended: true }))

    .get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../../public/index.html'))
    })
    .get('/health', (req, res) => {
      return res.status(200).send()
    })

  await connectMongo()
}
