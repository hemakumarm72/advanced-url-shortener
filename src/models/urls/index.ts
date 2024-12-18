import { UrlDocument } from '../@types'
import { BaseModel } from '../base/base.model'
import { Urls } from './urls.entity'
class UrlModel extends BaseModel<UrlDocument> {
  constructor() {
    super(Urls)
  }

  getTopic = async (userId: string): Promise<string[]> => {
    try {
      const result = await Urls.find({ userId, topic: { $ne: null } }).distinct(
        'topic',
      )
      return result as string[]
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export const urlModel = new UrlModel()
