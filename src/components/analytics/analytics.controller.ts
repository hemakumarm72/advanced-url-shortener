import { Request, Response, NextFunction } from 'express'
import { urlModel } from '../../models/urls'
import { urlLogsModel } from '../../models/urlLogs'
import { handleResponse } from '../../middleware/requestHandle'
import { invalidException } from '../../utils/apiErrorHandler'

export const getAnalyticsByAlias = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { alias } = req.params
    const { userId } = req.query

    const result = await urlLogsModel.analyticsByAlias(userId as string, alias)

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
    const { userId } = req.query
    const result = await urlModel.getTopic(userId as string)
    return handleResponse(res, 200, { result })
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
    const { userId } = req.query
    const { topic } = req.params
    const topics = await urlModel.getTopic(userId as string)

    if (!topics.includes(topic)) throw invalidException('topic is invalid')
    const result = await urlLogsModel.analyticsByTopic(userId as string, topic)
    return handleResponse(res, 200, { result })
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
    const { userId } = req.query
    const result = await urlLogsModel.overAllAnalytics(userId as string)
    return handleResponse(res, 200, { result })
  } catch (error) {
    next(error)
  }
}
