import mongoose from 'mongoose'
import { UrlType, UrlDocument } from '../@types'

const UrlsSchema = new mongoose.Schema(
  {
    urlId: { type: String },
    longUrl: { type: String },
    alias: { type: String }, // TODO: short url.
    isCustomAlias: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const Urls = mongoose.model<UrlDocument>('Urls', UrlsSchema, 'urls')
