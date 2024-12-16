import { ClientSession } from 'mongoose'

import { NewUserDocument, UpdateUserDocument } from '../@types'
import { Plan } from '../plan/plan.entity'
import { Users } from './users.entity'

export const getUserByEmail = async (email: string) => {
  try {
    const admin = await Users.findOne({ email })
    return Promise.resolve(admin)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getUserByID = async (userId: string) => {
  try {
    const user = await Users.findOne({ userId })
    return Promise.resolve(user)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const addUser = async (
  user: NewUserDocument,
  session?: ClientSession | null | undefined,
) => {
  try {
    const newAdmin = new Users(user)
    await newAdmin.save({ session })
    return Promise.resolve()
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateUserFields = async (
  userId: string,
  data: UpdateUserDocument,
  session?: ClientSession | null | undefined,
) => {
  try {
    await Users.findOneAndUpdate({ userId }, { $set: data }, { session })
    return Promise.resolve()
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteOneUser = async (
  userId: string,
  session?: ClientSession | null | undefined,
) => {
  try {
    await Users.deleteOne({ userId }, { session })
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getProfileById = async (userId: string) => {
  try {
    const profile = await Users.findOne({ userId })
      .select('-password')
      .select('-refreshToken')
    return Promise.resolve(profile)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getPlan = async (userId?: string | null) => {
  try {
    const query = userId ? { userId } : {}
    const result = await Plan.aggregate([
      {
        $match: { isShow: false },
      },
      {
        $lookup: {
          from: 'users',
          as: 'userDetails',
          pipeline: [
            {
              $match: { ...query },
            },
            {
              $limit: 1,
            },
          ],
        },
      },
      {
        $addFields: {
          isCurrentPlan: userId
            ? {
                $eq: [{ $arrayElemAt: ['$userDetails.planId', 0] }, '$planId'],
              }
            : false,
        },
      },
      { $unset: ['userDetails'] },
      { $sort: { planId: 1 } },
    ])
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}
export const incCsvCount = async (
  userId: string,
  session?: ClientSession | null | undefined,
) => {
  try {
    await Users.updateOne({ userId }, { $inc: { csvCount: 1 } }, { session })
    return Promise.resolve()
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}
