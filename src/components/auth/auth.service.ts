import { invalidException } from '../../utils/apiErrorHandler'
import { encodeJwt } from '../../utils/jwt'

export const getToken = async (userId: string) => {
  try {
    const { ACCESS_TOKEN_EXPIRED_IN, REFRESH_TOKEN_EXPIRED_IN } = process.env

    const accessToken = encodeJwt(
      { id: userId },
      ACCESS_TOKEN_EXPIRED_IN || '5m',
      'access',
    )
    const refreshToken = encodeJwt(
      { id: userId },
      REFRESH_TOKEN_EXPIRED_IN || '30d',
      'refresh',
    )

    return { accessToken, refreshToken }
  } catch (error) {
    throw invalidException('internal server error')
  }
}
