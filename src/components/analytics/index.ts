import express from 'express'
import * as controller from './analytics.controller'
import { checkSchema } from 'express-validator'
import {
  GET_ANALYTICS_BY_ALIAS,
  GET_ANALYTICS_BY_TOPIC,
} from './analytics.validation'
import { checkValidation } from '../../utils/validation'

const router = express.Router()

router.get('/overAll', controller.getOverAllAnalytics)

router.get('/topic', controller.getTopic)
router.get(
  '/topic/:topic',
  checkSchema(GET_ANALYTICS_BY_TOPIC),
  checkValidation,
  controller.getAnalyticsByTopic,
)

router.get(
  '/:alias',
  checkSchema(GET_ANALYTICS_BY_ALIAS),
  checkValidation,
  controller.getAnalyticsByAlias,
)

export default router
