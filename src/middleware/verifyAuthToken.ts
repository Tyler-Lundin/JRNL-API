import jwt, { Secret } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { IUser } from '../models/user.model'

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  const authToken: string = (req.headers.authorization || req.headers.Authorization) as string

  if (!authToken) return res.status(400).json({ msg: 'Missing auth token' })
  jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET as Secret, (err, user: any) => {
    if (err) return res.status(403).json({ err: 'INVALID AUTH TOKEN' })
    req.userID = user.user._id
    next()
  })
}

export default verifyAuthToken
