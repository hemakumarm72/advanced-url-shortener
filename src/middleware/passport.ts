import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'
import { UsersType } from '../models/@types'
import { generateUniqueId } from '../utils/random'
import { usersModel } from '../models/users'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

export const googleStrategy = new Strategy(
  {
    clientID: GOOGLE_CLIENT_ID!,
    clientSecret: GOOGLE_CLIENT_SECRET!,
    //	authorizationURL: '/api/auth/google',
    callbackURL: `${process.env.GOOGLE_CLIENT_REDIRECT}/api/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, cb) => {
    // sign in auth
    const { email, name, picture } = profile._json
    const isUser = await usersModel.getByFieldAndValue('email', email)
    if (!isUser) {
      const create: UsersType = {
        googleId: profile.id,
        email: email as string,
        userId: generateUniqueId(),
        name: name as string,
        picture: picture as string,
      }

      await usersModel.add(create)
      return cb(null, create)
    } else {
      return cb(null, isUser)
    }
  },
)

passport.use(googleStrategy)

passport.serializeUser((user, done) => {
  return done(null, user)
})

passport.deserializeUser((user: any, done) => {
  return done(null, user)
})

export default passport
