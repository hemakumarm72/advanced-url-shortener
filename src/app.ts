import 'dotenv/config'
import express from 'express'

import { registerComponents } from './components'
import { config, errorHandler } from './middleware'

const app: express.Application = express()

config(app)

registerComponents(app)

errorHandler(app)

export default app
