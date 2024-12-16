import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { validationException } from './apiErrorHandler'

export const checkValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req)
  // console.warn(errors);validationResult
  !errors.isEmpty() ? next(validationException(errors.array())) : next()
}
