import express from 'express'
import * as controller from './shorten.controller'
import { checkSchema } from 'express-validator'
import { CREATE_URL, GET_URL } from './shorten.validation'
import { checkValidation } from '../../utils/validation'

const router = express.Router()

router.post(
  '/',
  checkSchema(CREATE_URL),
  checkValidation,
  controller.createShortenUrl,
)
router.get(
  '/:alias',
  checkSchema(GET_URL),
  checkValidation,
  controller.redirectShortenUrl,
)

export default router
