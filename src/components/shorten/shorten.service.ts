import { UrlType } from '../../models/@types'
import { urlModel } from '../../models/urls'

export const createShortenUrl = async (create: UrlType) => {
  try {
    // TODO: redis cache implemented
    await urlModel.add(create)
    return
  } catch (error) {
    return Promise.reject(error)
  }
}
