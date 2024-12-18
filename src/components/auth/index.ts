import express from 'express'

import passport from '../../middleware/passport'
import { generateUniqueId } from '../../utils/random'
import { isSession } from '../../utils/auth'

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

router.get('/me', isSession, (req, res) => res.json({ user: req.session.user }))
export default router
