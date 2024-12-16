import express from 'express'

import { isMaintainer } from '../utils/auth'
import components from './components'

export const registerComponents = (app: express.Application) => {
  app.use('/api', isMaintainer, components)
}
