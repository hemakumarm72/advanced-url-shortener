import 'express'
import 'express-session'

declare module 'express' {
  interface Request {}
}

declare module 'express-session' {
  interface SessionData {
    user: {
      sessionId: string
    }
  }
}
