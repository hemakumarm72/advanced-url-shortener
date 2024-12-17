import { Request, Response, NextFunction } from 'express'
import { urlModel } from '../../models/urls'
import { urlLogsModel } from '../../models/urlLogs'
import { handleResponse } from '../../middleware/requestHandle'

export const getAnalyticsByAlias = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { alias } = req.params

    const result = await urlLogsModel.analyticsByAlias(alias)

    return handleResponse(res, 200, { result })
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
