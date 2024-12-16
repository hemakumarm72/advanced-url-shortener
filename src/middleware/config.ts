import cors from 'cors'
import path from 'path'

import express from 'express'

import dbConnect from '../models/dbConnect'
import { errorRequestLogger, requestLogger } from '../utils/logger'

export const config = async (app: express.Application) => {
  app
  app
    .set('trust proxy', true) // Trust the proxy

    .use(requestLogger)
    .use(errorRequestLogger)
    .use(cors())
    .use(express.json())

    .use(express.urlencoded({ extended: false }))

    .get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../../public/index.html'))
    })
    .get('/health', (req, res) => {
      return res.status(200).send()
    })
  await dbConnect
    .initialize()
    .then(() => {
      console.log(`Connected Mysql ${process.env.DB_DATABASE} DB.`)
      // Start your application logic here
    })
    .catch((err: any) =>
      console.log('Error during Data Source initialization:', err),
    )

  // await connectMongo()
}
