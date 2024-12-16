import mongoose from 'mongoose'
import { UrlType } from '../@types'

const UrlLogsSchema = new mongoose.Schema(
  {
    logId: { type: String },
    urlId: { type: String },
    ipAdrress: { type: String },
    osName: {
      type: String,
      enum: ['windows', 'linux', 'andriod', 'ios', 'macOs'],
      default: 'windows',
    },
    deviceName: {
      type: String,
      enum: ['mobile', 'desktop'],
      default: 'mobile',
    },
  },
  { timestamps: true },
)

export const UrlLogs = mongoose.model<UrlType>(
  'UrlLogs',
  UrlLogsSchema,
  'urlLogs',
)
