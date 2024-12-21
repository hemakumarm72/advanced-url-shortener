import { Request, Response, NextFunction } from 'express'
import { handleResponse } from '../../middleware/requestHandle'
import { invalidException } from '../../utils/apiErrorHandler'

export const getProfile = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.session.user
    const result = {
      email: user?.email,
      name: user?.name,
      picture: user?.picture,
    }
    return handleResponse(res, 200, { result })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.session.destroy((err: any) => {
      if (err) {
        throw invalidException('session issues')
      }
      return handleResponse(res, 200, {})
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    req.session.user = req.body
    return handleResponse(res, 200, {})
  } catch (error) {
    console.log(error)
    next(error)
  }
}
