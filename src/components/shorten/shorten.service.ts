import { rejects } from 'assert'
import { UrlLogsType, UrlType } from '../../models/@types'
import { urlModel } from '../../models/urls'
import { urlLogsModel } from '../../models/urlLogs'
import { redisConnect } from '../../middleware/redis'

export const createShortenUrl = async (create: UrlType) => {
  try {
    // TODO: redis cache implemented
    await urlModel.add(create)
    await redisConnect.set(
      `shortUrl:${create.alias}`,
      JSON.stringify(create),
      'EX',
      3600, // TODO: cache i will expired 3600 (1 hour)
    )
    return
  } catch (error) {
    return Promise.reject(error)
  }
}

export const urlLogs = (logs: UrlLogsType) =>
  new Promise((resolve) => {
    resolve(urlLogsModel.add(logs))
  }) // it will increase speed
