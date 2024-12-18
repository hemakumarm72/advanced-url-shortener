import { NextFunction, Request, Response } from 'express'

import { invalidException } from './apiErrorHandler'

export const isSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.session.user
    console.log(user)

    if (!(user && user.email)) {
      console.log('redirect url')
      throw invalidException('user is not found')
    }

    next()
  } catch (err) {
    console.warn(err)
    next(err)
  }
}

export const isMaintainer = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isMaintenances = process.env.IS_MAINTENANCES
    if (isMaintenances === 'true') {
      throw invalidException('server maintenances', 10000) // TODO: 10000 server maintenances
    }
    next()
  } catch (err) {
    console.warn(err)
    next(err)
  }
}
