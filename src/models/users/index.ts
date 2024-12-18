import { UserDocument, UsersType } from '../@types'
import { BaseModel } from '../base/base.model'
import { Users } from './users.entity'
class UsersModel extends BaseModel<UserDocument> {
  constructor() {
    super(Users)
  }
}

export const usersModel = new UsersModel()
