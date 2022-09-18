import User, { IUser } from '../models/user.model'
import bcrypt from 'bcryptjs'
import jwt, { Secret } from 'jsonwebtoken'
import { CookieOptions, Request, Response } from 'express'
import verifyForm from '../utils/verifyForm'

/**********
 *
 *  TYPES
 *
 **********/
export type UserLogin = {
  email: string
  password: string
}

/**************
 *
 *  VARIABLES
 *
 **************/

const cookieOptions: CookieOptions = {
  maxAge: 1000 * 60 * 60, // 1 hour
  httpOnly: true,
  sameSite: 'none',
  secure: true,
}

/**********
 *
 *  LOGIN
 *
 **********/
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserLogin

  if (!verifyForm(email, password)) return res.status(409)

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) return res.status(404).json({ message: 'User not found' })

  const verifyPass = bcrypt.compare(password, user.password || '')
  if (!verifyPass) return res.status(401).json({ message: 'Invalid credentials' })

  const authToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET as Secret, {
    expiresIn: '1h',
  })
  return res
    .cookie('authToken', authToken, cookieOptions) // 1 hour
    .status(200)
    .json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        jrnlIDs: user.jrnlIDs,
      },
    })
}

/*************
 *
 *  REGISTER
 *
 *************/
const register = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const userExists = await User.findOne({ email: email.toLowerCase() })
  if (userExists) return res.status(409).json({ message: 'Email already in use!' })

  if (verifyForm(email, password)) {
    const newUser = new User({
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 10),
    })
    const savedUserRes = await newUser.save()
    if (savedUserRes)
      return res.status(200).json({ message: `Account for ${newUser.email} created` })
  } else {
    return res.status(400).json({ message: 'Invalid email or password' })
  }
}

export default {
  login,
  register,
}
