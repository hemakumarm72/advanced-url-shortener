import mongoose from 'mongoose'
import { UrlType } from '../@types'

const UrlsSchema = new mongoose.Schema(
  {
    urlId: { type: String },
    longUrl: { type: String },
    shortUrl: { type: String },
    isCustomAlias: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const Urls = mongoose.model<UrlType>('Urls', UrlsSchema, 'urls')
