import { NextFunction, Request, Response } from 'express'

import { invalidException } from './apiErrorHandler'

export const isSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // req.session.user = {
    //   userId: '102ac18d-b02',
    //   googleId: '106674716558566265579',
    //   email: 'hemakumarm72@gmail.com',
    //   name: 'Hema Kumar',
    //   picture:
    //     'https://lh3.googleusercontent.com/a/ACg8ocLa6jUWXJebRTTb0-lTc6-_5WBng5sCnoKlqliEucuDA4L-sCUY=s96-c',
    //   sessionId: '3ZD8xmwA842wnpJ3Mt6vVxZNtFvRVh5U',
    // }
    const user = req.session.user

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
