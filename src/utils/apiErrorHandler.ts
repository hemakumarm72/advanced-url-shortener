import { ValidationError } from 'express-validator'

const DATA_NOT_FOUND = 'Data not found'

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
  subStatusCode?: number
  /**
   * HttpException.
   * @param {number} statusCode The first message.
   * @param {string} messages The second code.
   * @param {number} subStatusCode The third status.
   */
  constructor(
    statusCode: number,
    messages: string | string[],
    subStatusCode: number,
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

export const invalidException = (
  error: string,
  subStatusCode: number = 5000,
) => {
  return new HttpException(400, error || DATA_NOT_FOUND, subStatusCode)
}
