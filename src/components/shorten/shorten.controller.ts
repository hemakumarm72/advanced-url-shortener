import { Request, Response, NextFunction } from 'express'
import RandomString from 'randomstring'
import { urlModel } from '../../models/urls'
import { UrlLogsType, UrlType } from '../../models/@types'
import { generateUniqueId } from '../../utils/random'
import { handleResponse } from '../../middleware/requestHandle'
import { invalidException } from '../../utils/apiErrorHandler'
import * as service from './shorten.service'
import { Details } from 'express-useragent'

const findUniqueCode = async () => {
  try {
    let length = 4,
      isExiting = true,
      code = ''

    while (isExiting) {
      code = RandomString.generate({
        length: length,
        charset: 'alphabetic',
      })
      const getCode = await urlModel.getByFieldAndValue('alias', code)
      if (getCode) length++
      else isExiting = false
    }

    return code
  } catch (error) {
    return Promise.reject(error)
  }
}

export const createShortenUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { longUrl, customAlias, topic, userId } = req.body

    const alias = customAlias ? customAlias : await findUniqueCode()

    const add: UrlType = {
      urlId: generateUniqueId(),
      userId,
      longUrl,
      alias,
      topic,
      isCustomAlias: customAlias ? true : false,
    }

    await service.createShortenUrl(add)

    const getData = await urlModel.getByFieldAndValue('urlId', add.urlId)
    const baseUrl = process.env.BASE_URL

    return handleResponse(res, 200, {
      shortUrl: `${baseUrl}/api/shorten/${add.alias}`,
      createdAt: getData?.createdAt,
    })
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
    const sessionUser = req.session.user
    if (!sessionUser) {
      req.session.user = { sessionId: req.session.id }
    }
    const sessionId = req.session.user?.sessionId

    const { alias } = req.params
    // TODO: Redis implemented....

    const getUrl = await urlModel.getByFieldAndValue('alias', alias) // TODO: mongodb

    if (!getUrl) throw invalidException('url not found')
    const userAgent = req.useragent as Details
    const urlLogs: UrlLogsType = {
      logId: generateUniqueId(),
      urlId: getUrl.urlId,
      userId: getUrl.userId,
      sessionId: sessionId as string,
      geoIp: (req.headers['x-forwarded-for'] as string) || '127.0.0.1',
      os: userAgent.os as string,
      platform: userAgent.platform,
      browser: userAgent.browser,
      browserVersion: userAgent.version,
      source: userAgent.source,
    }
    // await urlLogsModel.add(urlLogs)
    userAgent.os !== 'unknown' ? service.urlLogs(urlLogs) : null
    res.redirect(`${getUrl.longUrl}`)
  } catch (error) {
    next(error)
  }
}

