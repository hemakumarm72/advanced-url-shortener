import { Location, ParamSchema } from 'express-validator'
import { REGEXP_URL } from './regexp'
import { urlModel } from '../models/urls'

export const VALIDATION_STRING = (
  where: Location,
  length: number = 1000,
  subStatusCode: string = '4014',
  checkBy?: 'optional',
): ParamSchema => ({
  in: [where],
  isString: checkBy === 'optional' ? false : { errorMessage: subStatusCode },
  notEmpty: checkBy === 'optional' ? false : true,
  isLength: {
    options: checkBy === 'optional' ? undefined : { min: 1, max: length },
    errorMessage: '4015',
  },
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

export const VALIDATION_LONG_URL = (
  where: Location,
  subStatusCode: string = '4014',
  checkBy?: 'optional',
): ParamSchema => ({
  in: [where],
  isString: checkBy === 'optional' ? false : { errorMessage: subStatusCode },
  notEmpty: checkBy === 'optional' ? false : true,
  isLength: {
    options: checkBy === 'optional' ? undefined : { min: 1, max: 255 },
    errorMessage: '4015',
  },
  errorMessage: subStatusCode,
  matches:
    checkBy === 'optional'
      ? false
      : {
          options: [REGEXP_URL],
          errorMessage: subStatusCode,
        },
})

export const VALIDATION_CUSTOM_ALIAS = (
  where: Location,
  checkBy?: 'optional',
): ParamSchema => ({
  in: [where],
  isString: checkBy === 'optional' ? false : { errorMessage: '4018' },
  notEmpty: checkBy === 'optional' ? false : true,
  custom: {
    options: async (value, { req, location, path }) => {
      if (checkBy === 'optional' && value === undefined) return true
      const customAlias = await urlModel.getByFieldAndValue('alias', value)
      if (customAlias) throw new Error('4018') // TODO: questionId is invalid
      return true
    },
  },
})
