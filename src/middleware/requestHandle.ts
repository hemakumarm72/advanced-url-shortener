import { Response } from 'express'

export const handleResponse = (
  res: Response,
  statusCode: 200 | 201 | 204,
  data: object,
) => {
  return res.status(statusCode).send({ success: true, ...data })
}

export const handleResponseFile = (
  res: Response,
  statusCode: 200 | 201 | 204,
  file: string,
) => {
  return res.status(statusCode).send(file)
}
