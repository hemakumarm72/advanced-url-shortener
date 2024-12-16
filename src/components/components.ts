import express from 'express'

import authComponent from './auth'
import shortenComponent from './shorten'
import analyticsComponent from './analytics'

const router = express.Router()

router.use('/auth', authComponent)
router.use('/shorten', shortenComponent)
router.use('/analytics', analyticsComponent)

export default router
