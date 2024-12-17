import mongoose from 'mongoose'
import { UrlDocument } from '../@types'

const UrlsSchema = new mongoose.Schema(
  {
    urlId: { type: String },
    userId: { type: String },
    longUrl: { type: String },
    alias: { type: String }, // TODO: short url.
    topic: { type: String, default: null },
    isCustomAlias: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const Urls = mongoose.model<UrlDocument>('Urls', UrlsSchema, 'urls')
