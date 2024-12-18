import mongoose from 'mongoose'

import { UserDocument } from '../@types'

const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true, required: true },
    googleId: { type: String },
    email: { type: String, default: null },
    name: { type: String },
    picture: { type: String },
  },
  { timestamps: true },
)

export const Users = mongoose.model<UserDocument>('Users', UserSchema, 'users')
