﻿import { Schema } from 'express-validator'
import { VALIDATION_STRING } from '../../constants/validation'

export const GET_ANALYTICS_BY_ALIAS: Schema = {
  alias: VALIDATION_STRING('params'),
}
