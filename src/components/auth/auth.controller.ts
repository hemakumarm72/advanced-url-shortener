import { Request, Response, NextFunction } from 'express'
import { handleResponse } from '../../middleware/requestHandle'
import * as service from './auth.service'

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    // creates accessToken and refreshToken

    const { email, password } = req.body

    // const {} = service.getToken(userId)
    // return handleResponse(res, 200, {
    //   result: { accessToken, refreshToken },
    // })
  } catch (error) {}
}

export const register = () => {}

export const googleSignIn = () => {}

export const logOut = () => {}
