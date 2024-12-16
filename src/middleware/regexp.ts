/**
 * @description Check kana
 */
/* eslint-disable no-irregular-whitespace */
export const REGEXP_NAME = /^[ァ-ンヴー　]*$/
/**
 * @description YYYY-MM-DD
 */
export const REGEXP_BIRTH = /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])$/
/**
 * @description NN
 */
export const REGEXP_TWO_DIGITS = /^\d{2}$/
/**
 * @description At least one special char, one lowercase, one uppercase, one number
 */
export const REGEXP_PASSWORD =
  /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,}).{6,}$/
/**
 * @description YYYY-MM-DD HH:MM:SS+HH:MM
 */
export const REGEXP_DATE_TIME =
  /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])T(0\d|1\d|2[0-3]):[0-5]\d:[0-5]\d(\+|-)(0\d|1\d|2[0-3]):[0-5]\d$/

// password of length 6 and only string and number
export const REGEXP_PASSWORD_WEAK = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/

export const REGEXP_START_AT =
  /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s([01]\d|2[0-3]):[0-5]\d$/
// Regex to match the format 'YYYY-MM-DD HH:mm'
