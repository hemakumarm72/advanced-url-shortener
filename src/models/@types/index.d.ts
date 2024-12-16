import mongoose, { UpdateQuery } from 'mongoose'

type UpdateType<T> = {
  fieldName: keyof T
  value: string
  updateData: UpdateQuery<T>
}

type UsersType = {
  userId: string
  email: string
  password: string
  refreshToken: string
  status: 'active' | 'suspended'
  deletedAt: Date | null
}

type UpdateUserType = Partial<UsersType>

type UrlType = {
  urlId: string
  longUrl: string
  alias: string
  isCustomAlias: boolean
}

type UrlDocument = mongoose.Document & UrlType
