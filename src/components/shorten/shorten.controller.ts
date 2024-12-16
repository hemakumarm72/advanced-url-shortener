import { Request, Response, NextFunction } from 'express'
import RandomString from 'randomstring'
import { urlModel } from '../../models/urls'

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

    const shortUrl = customAlias ? customAlias : await findUniqueCode()
    
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
