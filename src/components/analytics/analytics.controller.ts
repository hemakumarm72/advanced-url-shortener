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
    const user = req.session.user
    if (!(user && user.userId)) throw invalidException('user not found')
    const checkAlias = await urlModel.getByQuery({
      userId: user.userId,
      alias: alias,
    })
    if (!checkAlias) throw invalidException('alias is not found')
    const result = await urlLogsModel.analyticsByAlias(
      user.userId as string,
      alias,
    )

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
    const user = req.session.user
    if (!(user && user.userId)) throw invalidException('user not found')
    const result = await urlModel.getTopic(user.userId as string)
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
    const { topic } = req.params
    const user = req.session.user
    if (!(user && user.userId)) throw invalidException('user not found')
    const topics = await urlModel.getTopic(user.userId as string)

    if (!topics.includes(topic)) throw invalidException('topic is invalid')
    const result = await urlLogsModel.analyticsByTopic(
      user.userId as string,
      topic,
    )
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
    const user = req.session.user
    if (!(user && user.userId)) throw invalidException('user not found')
    const result = await urlLogsModel.overAllAnalytics(user.userId as string)
    return handleResponse(res, 200, { result })
  } catch (error) {
    next(error)
  }
}
