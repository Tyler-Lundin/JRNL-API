import { Router } from 'express'
import verifyAuthToken from '../middleware/verifyAuthToken'
import authRoutes from './auth.routes'
import journalRoutes from './journal.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/journal', verifyAuthToken, journalRoutes)

export default router
