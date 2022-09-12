import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import AUTH from '../controllers/auth.controller'
const router = express.Router()

router.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    AUTH.login(req, res)
  })
)

router.post(
  '/register',
  asyncHandler(async (req: Request, res: Response) => {
    AUTH.register(req, res)
  })
)

export default router
