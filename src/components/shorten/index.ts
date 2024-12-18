import express from 'express'
import * as controller from './shorten.controller'
import { checkSchema } from 'express-validator'
import { CREATE_URL, GET_URL } from './shorten.validation'
import { checkValidation } from '../../utils/validation'
import { visitedSession } from '../../middleware/session'
import { isSession } from '../../utils/auth'
import { apiLimit } from '../../middleware/apiLimit'

const router = express.Router()

router.post(
  '/',
  isSession,
  apiLimit,
  checkSchema(CREATE_URL),
  checkValidation,
  controller.createShortenUrl,
)
router.get(
  '/:alias',
  visitedSession, // TODO: session i will identity unique user
  checkSchema(GET_URL),
  checkValidation,
  controller.redirectShortenUrl,
)

export default router
