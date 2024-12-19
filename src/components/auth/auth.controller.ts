import { Request, Response, NextFunction } from 'express'
import { handleResponse } from '../../middleware/requestHandle'

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
