import mongoose from 'mongoose'
import { UrlLogsDocument } from '../@types'

const UrlLogsSchema = new mongoose.Schema(
  {
    logId: { type: String },
    urlId: { type: String },
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
