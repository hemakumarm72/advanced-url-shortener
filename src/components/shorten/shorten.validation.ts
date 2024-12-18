import { Schema } from 'express-validator'
import {
  VALIDATION_CUSTOM_ALIAS,
  VALIDATION_LONG_URL,
  VALIDATION_STRING,
} from '../../constants/validation'

export const CREATE_URL: Schema = {
  longUrl: VALIDATION_LONG_URL('body'),
  customAlias: VALIDATION_CUSTOM_ALIAS('body', 'optional'),
  topic: VALIDATION_STRING('body', 25, '4014', 'optional'),
}

export const GET_URL: Schema = {
  alias: VALIDATION_STRING('params'),
}
