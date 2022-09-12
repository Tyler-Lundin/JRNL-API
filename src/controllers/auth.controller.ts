import User, { IUser } from '../models/user.model'
import bcrypt from 'bcryptjs'
import jwt, { Secret } from 'jsonwebtoken'
import { Request, Response } from 'express'

export type UserLogin = {
  email: string
  password: string
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserLogin
  if (!emailValidator(email)) {
    return res.status(400).json({ message: 'Invalid email' })
  }
  if (!passwordValidator(password)) {
    return res.status(400).json({ message: 'Invalid password' })
  }
  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) return res.status(400).json({ message: 'User not found' })
  const passwordValid = await bcrypt.compare(password, user.password || '')
  console.log('user: ', user)
  if (passwordValid) {
    const authToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET as Secret, {
      expiresIn: '1h',
    })
    return res.status(200).json(authToken)
  } else {
    res.status(401).json({
      message: 'Invalid credentials',
    })
  }
}

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const userExists = await User.findOne({ email: email.toLowerCase() })
  if (userExists?.email === email) return res.status(400).send('Email already in use!')

  if (emailValidator(email) && passwordValidator(password)) {
    console.log('VALID EMAIL AND PASSWORD')
    const newUser = new User({
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 10),
    })
    const savedUserRes = await newUser.save()
    if (savedUserRes) return res.status(200).json({ msg: `Account for ${newUser.email} created` })
  } else {
    return res.status(400).json({ msg: 'Invalid email or password' })
  }
}

function emailValidator(email: string) {
  // is a valid email address
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email
    )
  ) {
    return false
  }
  return email.length > 0 && email.length < 100
}

function passwordValidator(password: string) {
  // password doesn't contain any special characters except for '.' and '!'
  if (!/^[a-zA-Z0-9!.]+$/.test(password)) {
    return false
  }
  return password.length > 0 && password.length < 20
}

const AUTH_CONTROLLER = {
  login,
  register,
}

export default AUTH_CONTROLLER
