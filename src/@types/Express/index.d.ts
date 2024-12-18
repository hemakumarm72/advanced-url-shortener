import 'express'
import 'express-session'
import { UpdateUserType, UsersType } from '../../models/@types'

declare module 'express' {
  interface Request {}
}

declare module 'express-session' {
  interface SessionData {
    user: UpdateUserType & {
      sessionId: string
    }
  }
}
