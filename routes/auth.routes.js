import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { authLoginUser, authRegisterUser } from '../controllers/auth.controller.js'
import authToken from '../middleware/authToken.js'
const router = express.Router()

// @DESC : empty route for testing
// @ROUTE : /auth/
router.get(
  '/',
  expressAsyncHandler(async (req, res) =>
    res.status(200).json({ routes: ['/auth/login', '/auth/register'] })
  )
)

// @DESC : Login user
// @ROUTE : /auth/login
// @METHOD : POST
// @REQ_BODY : { email, password }
router.post(
  '/login',
  expressAsyncHandler(async (req, res) => authLoginUser(req, res))
)

// @DESC : Create a new user
// @ROUTE : /auth/register
// @METHOD : POST
// @REQ_BODY : { email, password }
router.post(
  '/register',
  expressAsyncHandler(async (req, res) => authRegisterUser(req, res))
)

router.get('/verify', authToken, (req, res) => res.status(200).json({ message: 'verified' }))

export default router
