import { Request, Response, NextFunction } from 'express'

export const createShortenUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
		const { longUrl, customAlias, topic } = req.body
		
     

  } catch (error) {
    next(error)
  }
}

export const redirectShortenUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    next(error)
  }
}
