import { Request, Response, NextFunction } from 'express'
import RandomString from 'randomstring'
import { urlModel } from '../../models/urls'
import { UrlLogsType, UrlType } from '../../models/@types'
import { generateUniqueId } from '../../utils/random'
import { handleResponse } from '../../middleware/requestHandle'
import { dataNotExit, invalidException } from '../../utils/apiErrorHandler'
import * as service from './shorten.service'
import { Details } from 'express-useragent'
import { redisConnect } from '../../middleware/redis'

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
    const user = req.session.user
    if (!(user && user.userId)) throw invalidException('user not found')
    const { longUrl, customAlias, topic } = req.body

    const alias = customAlias ? customAlias : await findUniqueCode()

    const add: UrlType = {
      urlId: generateUniqueId(),
      userId: user.userId,
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
    const sessionId = req.session.user?.sessionId

    const { alias } = req.params
    // TODO: Redis implemented....

    const cachedUrl = await redisConnect.get(`shortUrl:${alias}`)
    let getUrl

    if (cachedUrl) {
      getUrl = JSON.parse(cachedUrl)
    } else {
      getUrl = await urlModel.getByFieldAndValue('alias', alias) // TODO: mongodb
      if (!getUrl) throw dataNotExit('url not found')
      await redisConnect.set(
        `shortUrl:${alias}`,
        JSON.stringify(getUrl),
        'EX',
        3600, // TODO: cache i will expired 3600 (1 hour)
      )
    }

    const userAgent = req.useragent as Details
    const urlLogs: UrlLogsType = {
      logId: generateUniqueId(),
      urlId: getUrl.urlId,
      userId: getUrl.userId,
      sessionId: sessionId as string,
      geoIp: (req.headers['x-forwarded-for'] as string) || (req.ip as string),
      os: userAgent.os as string,
      platform: userAgent.platform,
      browser: userAgent.browser,
      browserVersion: userAgent.version,
      source: userAgent.source,
    }

    if (userAgent.os !== 'unknown') {
      service.urlLogs(urlLogs)
    }
    res.redirect(`${getUrl.longUrl}`)
  } catch (error) {
    next(error)
  }
}
