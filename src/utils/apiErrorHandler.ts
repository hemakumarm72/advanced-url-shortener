import { ValidationError } from 'express-validator'


const ERROR = 'Error'
const VALIDATION = 'Invalid format'
const UN_AUTH = 'Unauthorized'
const CONFLICT = 'Conflict'
const DATA_NOT_FOUND = 'Data not found'
const PAGE_NOT_FOUND = 'Page not found'
const BAD_IMPLEMENTATION = 'Internal Server Error'
const DATA_EXCEED = 'Data is exceeded'
const USER_NOT_ACTIVATE = 'User is not activated'

/**
 * HttpException.
 * @param {number} statusCode The first message.
 * @param {string} message The second code.
 * @param {string | string[]} errorMessage The third status.
 * @param {number} subStatusCode The third status.
 *  @return {any}
 */
export class HttpException extends Error {
  statusCode?: number
  message: string
  errorMessage: string | string[]
  subStatusCode?: string
  /**
   * HttpException.
   * @param {number} statusCode The first message.
   * @param {string} messages The second code.
   * @param {string} subStatusCode The third status.
   */
  constructor(
    statusCode: number,
    messages: string | string[],
    subStatusCode: string,
  ) {
    super(messages[0])
    this.statusCode = statusCode || 500
    this.message = Array.isArray(messages) ? messages[0] : messages
    this.errorMessage = messages
    this.subStatusCode = subStatusCode
  }
}

export const validationException = (errors: ValidationError[]) => {
  //   errors && console.warn(errors);
  errors
  return new HttpException(
    400,
    errors[0].type === 'field'
      ? `Validation Error: ${errors[0].path}`
      : 'Validation Error: ' + errors[0].msg,
    errors[0].type === 'field'
      ? errors[0].msg === 'Invalid value'
        ? '2005'
        : errors[0].msg
      : '0000',
  )
}

export const invalidException = (error: string, subStatusCode: string) => {
  return new HttpException(400, error || DATA_NOT_FOUND, subStatusCode)
}

export const dataNotExistException = (error: string) => {
  return new HttpException(400, error || DATA_NOT_FOUND, '1002')
}

export const userNotActivateException = (error: string) => {
  return new HttpException(400, error || USER_NOT_ACTIVATE, '1003')
}

export const dataExceedException = (error: string) => {
  return new HttpException(400, error || DATA_EXCEED, '1004')
}

export const unauthorizedException = (error: string) => {
  return new HttpException(401, error || UN_AUTH, '2001')
}
export const dataConflictException = (
  error: string,
  subStatusCode?: string,
) => {
  return new HttpException(
    409,
    error || CONFLICT,
    subStatusCode ? subStatusCode : '3001',
  )
}

export const pageNoFoundException = (error: string) => {
  return new HttpException(404, error || PAGE_NOT_FOUND, '4000')
}

export const dataNotFoundException = (error: string) => {
  return new HttpException(404, error || PAGE_NOT_FOUND, '2005')
}

export const badImplementationException = (error: string) => {
  return new HttpException(500, error || BAD_IMPLEMENTATION, '5000')
}
