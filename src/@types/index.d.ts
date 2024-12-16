import { UpdateAnswerDocument } from '../models/@types'

export type searchAnswerInput = UpdateAnswerDocument & {
  keyword?: string
  startAt?: string
  endAt?: string
  question?: string
  nickName?: string
  area?: string
  status?: string
  birthYear?: string
}

export type CognitoIdToken = {
  sub: string
  email_verified: boolean
  iss: string
  'cognito:username': string
  origin_jti: string
  aud: string
  event_id: string
  token_use: 'id' | 'access' | 'refresh'
  auth_time: number
  exp: number
  'custom:role'?: 'dnp' | 'steAm' | 'expo' // Optional if not always present
  iat: number
  jti: string
  email: string
}
