import { Location, ParamSchema } from 'express-validator'


export const VALIDATION_STRING = (
  where: Location,
  length: number = 1000,
  subStatusCode: string = '4014',
  checkBy?: 'optional',
): ParamSchema => ({
  in: [where],
  isString: checkBy === 'optional' ? false : { errorMessage: subStatusCode },
  notEmpty: checkBy === 'optional' ? false : true,
  isLength: { options: { min: 1, max: length }, errorMessage: '4015' },
  errorMessage: subStatusCode,
})


export const VALIDATION_NUMBER = (
  where: Location,
  subStatusCode: string = '4014',
  checkBy?: 'optional',
): ParamSchema => ({
  in: [where],
  isNumeric: checkBy === 'optional' ? false : { errorMessage: subStatusCode },
  notEmpty: checkBy !== 'optional' ? true : false,
})

export const VALIDATION_BOOLEAN = (
  where: Location,
  subStatusCode: string = '4014',
  checkBy?: 'optional',
): ParamSchema => ({
  in: [where],
  isBoolean: checkBy === 'optional' ? false : { errorMessage: subStatusCode },
  notEmpty: checkBy !== 'optional' ? true : false,
})


