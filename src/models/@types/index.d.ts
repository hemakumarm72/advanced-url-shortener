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
  createdAt?: Date
  updatedAt?: Date
}

type UpdateUserType = Partial<UsersType>

type UrlType = {
  urlId: string
  userId: string
  longUrl: string
  alias: string
  topic: string | null
  isCustomAlias: boolean
  createdAt?: Date
  updatedAt?: Date
}

type UrlDocument = mongoose.Document & UrlType

type UrlLogsType = {
  logId: string
  sessionId: string
  urlId: string
  userId: string
  geoIp: string
  os: string
  browser: string
  platform: string
  browserVersion: string
  source: string
}

type UpdateUrlLogsType = Partial<UrlLogsType>

type UrlLogsDocument = mongoose.Document & UrlLogsType
