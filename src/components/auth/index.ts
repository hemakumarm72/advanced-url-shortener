import express from 'express'

import passport from '../../middleware/passport'
import { isSession } from '../../utils/auth'
import * as controller from './auth.controller'
const router = express.Router()

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
)

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/404' }),
  (req, res) => {
    req.session.user = { ...req.user, sessionId: req.session.id }
    res.redirect('/')
  },
)

router.get('/me', isSession, controller.getProfile)
export default router
