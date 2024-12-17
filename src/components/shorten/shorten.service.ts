import { rejects } from 'assert'
import { UrlLogsType, UrlType } from '../../models/@types'
import { urlModel } from '../../models/urls'
import { urlLogsModel } from '../../models/urlLogs'

export const createShortenUrl = async (create: UrlType) => {
  try {
    // TODO: redis cache implemented
    await urlModel.add(create)
    return
  } catch (error) {
    return Promise.reject(error)
  }
}

export const urlLogs = (logs: UrlLogsType) =>
  new Promise((resolve) => {
    resolve(urlLogsModel.add(logs))
  }) // it will increase speed
