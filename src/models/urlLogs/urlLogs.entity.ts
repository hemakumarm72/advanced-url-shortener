import mongoose from 'mongoose'
import { UrlLogsDocument } from '../@types'

const UrlLogsSchema = new mongoose.Schema(
  {
    logId: { type: String },
    sessionId: { type: String },
    userId: { type: String }, // link ---> url schema table
    urlId: { type: String }, // link ---> url schema table
    geoIp: { type: String },
    os: {
      type: String,
    },
    browser: {
      type: String,
    },
    platform: { type: String },
    browserVersion: {
      type: String,
    },
    source: { type: String },
  },
  { timestamps: true },
)

export const UrlLogs = mongoose.model<UrlLogsDocument>(
  'UrlLogs',
  UrlLogsSchema,
  'urlLogs',
)
