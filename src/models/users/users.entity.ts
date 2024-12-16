import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

import { UsersType } from '../@types'

const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true, required: true },
    email: { type: String, default: null },
    password: { type: String, default: null },
    refreshToken: { type: String },
    status: { type: String, enum: ['active', 'suspended'], default: 'active' },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
)

UserSchema.pre('find', function () {
  this.where({ deletedAt: null })
})

UserSchema.pre('findOne', function () {
  this.where({ deletedAt: null })
}) // Soft Delete

UserSchema.pre('save', function save(next) {
  const users = this as any
  try {
    if (!users.isModified('password') || users.password === null) {
      return next()
    }
    const hash = bcrypt.hashSync(users.password, 10)
    users.password = hash
    next()
  } catch (err) {
    next(err as Error)
  }
})

UserSchema.pre('findOneAndUpdate', function findOneAndUpdate(next) {
  try {
    this.where({ deletedAt: null })
    const data: any = this.getUpdate()
    if (data) {
      const password = data.$set.password
      if (password) {
        this.setOptions({})
        const hash = bcrypt.hashSync(password, 10)
        this.setUpdate({ ...data.$set, password: hash })
      }
    }
    next()
  } catch (err) {
    return next(err as Error)
  }
})


export const Users = mongoose.model<UsersType>('users', UserSchema, 'users')
