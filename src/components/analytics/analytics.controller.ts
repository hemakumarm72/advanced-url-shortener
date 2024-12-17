import { Request, Response, NextFunction } from 'express'

export const getAnalyticsByAlias = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { alias } = req.params

    
  } catch (error) {
    next(error)
  }
}

export const getTopic = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    next(error)
  }
}

export const getAnalyticsByTopic = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    next(error)
  }
}

export const getOverAllAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    next(error)
  }
}
