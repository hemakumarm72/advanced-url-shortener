import express from 'express'

import authComponent from './auth'
import shortenComponent from './shorten'
import analyticsComponent from './analytics'
import { isSession } from '../utils/auth'

const router = express.Router()

router.use('/auth', authComponent)
router.use('/shorten', shortenComponent)
router.use('/analytics', isSession, analyticsComponent)

export default router
