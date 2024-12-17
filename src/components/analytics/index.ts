import express from 'express'
import * as controller from './analytics.controller'
import { checkSchema } from 'express-validator'
import { GET_ANALYTICS_BY_ALIAS } from './analytics.validation'

const router = express.Router()

router.get(
  '/:alias',
  checkSchema(GET_ANALYTICS_BY_ALIAS),
  controller.getAnalyticsByAlias,
)

export default router
