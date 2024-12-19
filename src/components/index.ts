import express from 'express'

import { isMaintainer } from '../utils/auth'
import components from './components'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

export const registerComponents = (app: express.Application) => {
  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  app.use('/api', isMaintainer, components)
}
