import jwt from 'jsonwebtoken'

import { invalidException } from './apiErrorHandler'

export const encodeJwt = (
  payload: string | Record<string, unknown> | Buffer,
  expiresIn: string | number,
  secret: 'refresh' | 'access' | 'loginAccess' | 'default' = 'default',
) => {
  try {
    const SECRET =
      secret === 'refresh'
        ? process.env.JWT_REFRESH_SECRET
        : secret === 'access'
        ? process.env.JWT_ACCESS_SECRET
        : secret === 'loginAccess'
        ? process.env.LOGIN_TOKEN_SECRET
        : process.env.JWT_SECRET

    if (!SECRET) throw invalidException('SECRET is not defined on env file')
    const jwtToken = jwt.sign({ payload }, SECRET, { expiresIn })
    return jwtToken
  } catch (err) {
    throw err
  }
}

export const decodeJwt = (
  jwtToken: string,
  secret: 'refresh' | 'access' | 'loginAccess' | 'default' = 'default',
) => {
  try {
    const SECRET =
      secret === 'refresh'
        ? process.env.JWT_REFRESH_SECRET
        : secret === 'access'
        ? process.env.JWT_ACCESS_SECRET
        : secret === 'loginAccess'
        ? process.env.LOGIN_TOKEN_SECRET
        : process.env.JWT_SECRET
    if (!SECRET) throw invalidException('SECRET is not defined on env file')

    const decode = jwt.verify(jwtToken, SECRET)
    if (typeof decode === 'string')
      throw invalidException('JWT token is invalid')

    return decode
  } catch (err) {
    throw invalidException('JWT is not valid')
  }
}
