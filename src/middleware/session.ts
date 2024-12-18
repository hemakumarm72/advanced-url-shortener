import { Request, Response, NextFunction } from 'express'

export const visitedSession = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sessionUser = req.session.user
  if (!sessionUser) {
    req.session.user = { sessionId: req.session.id }
  }
  next()
}
