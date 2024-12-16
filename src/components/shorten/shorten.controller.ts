import { Request, Response, NextFunction } from 'express'
import RandomString from 'randomstring'
import { urlModel } from '../../models/urls'
import { UrlType } from '../../models/@types'
import { generateUniqueId } from '../../utils/random'
import { handleResponse } from '../../middleware/requestHandle'
import { invalidException } from '../../utils/apiErrorHandler'
import * as service from './shorten.service'
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
    const { longUrl, customAlias, topic } = req.body

    if (customAlias) {
    }

    const alias = customAlias ? customAlias : await findUniqueCode()

    const add: UrlType = {
      urlId: generateUniqueId(),
      longUrl,
      alias,
      topic,
      isCustomAlias: customAlias ? true : false,
    }

    await service.createShortenUrl(add)

    const getData = await urlModel.getByFieldAndValue('urlId', add.urlId)
    const baseUrl = process.env.BASE_URL

    return handleResponse(res, 200, {
      shortUrl: `${baseUrl}/${add.alias}`,
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
    const { alias } = req.params

    // TODO: Redis implemented....

    const getUrl = await urlModel.getByFieldAndValue('alias', alias) // TODO: mongodb

    if (!getUrl) throw invalidException('url not found')

    return res.redirect(getUrl.longUrl)
  } catch (error) {
    next(error)
  }
}
