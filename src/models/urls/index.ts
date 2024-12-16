import { UrlDocument } from '../@types'
import { BaseModel } from '../base/base.model'
import { Urls } from './urls.entity'
class UrlModel extends BaseModel<UrlDocument> {
  constructor() {
    super(Urls)
  }
}

export const urlModel = new UrlModel()
