import { UrlDocument } from '../@types'
import { BaseModel } from '../base/base.model'
import { Urls } from './urls.entity'
class UrlModel extends BaseModel<UrlDocument> {
  constructor() {
    super(Urls)
  }

  getUrlIdByUserId = async (userId: string): Promise<string[]> => {
    try {
      const result = Urls.find({ userId }).distinct('urlId')
      return result
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export const urlModel = new UrlModel()
