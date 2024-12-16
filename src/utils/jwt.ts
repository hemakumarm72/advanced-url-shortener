import jwt from 'jsonwebtoken'

import {
  badImplementationException,
  unauthorizedException,
} from './apiErrorHandler'

export const decodeJwt = (jwtToken: string) => {
  try {
    const decode = jwt.decode(jwtToken)
    if (typeof decode === 'string')
      throw unauthorizedException('JWT token is invalid')

    return decode
  } catch (err) {
    throw unauthorizedException('JWT is not valid')
  }
}
