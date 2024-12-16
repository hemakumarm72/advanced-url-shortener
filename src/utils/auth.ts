import { NextFunction, Request, Response } from 'express'

import { CognitoIdToken } from '../@types'
import { invalidException, unauthorizedException } from './apiErrorHandler'
import { setAwsCognito } from './helper'
import { decodeJwt } from './jwt'



export const isMaintainer = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isMaintenances = process.env.IS_MAINTENANCES
    if (isMaintenances === 'true') {
      throw invalidException('server maintenances', '10000') // TODO: 10000 server maintenances
    }
    next()
  } catch (err) {
    console.warn(err)
    next(err)
  }
}
