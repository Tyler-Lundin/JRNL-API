import jwt, { Secret } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
// import timestamp from 'time-stamp'
import { WriteToFile } from './Logger'

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  // const authToken: string = (req.headers.authorization || req.headers.Authorization) as string
  const authToken: string = req.cookies.authToken

  if (!authToken) return res.status(400).json({ message: 'Authorization failed, Please login' })
  jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET as Secret, (err, { user }: any) => {
    if (err) return res.status(403).json({ err: 'INVALID AUTH TOKEN' })
    req.user = user
    // console.log(timestamp('[ HH:mm:ss ]'.red), 'user authorized: ', user.email)
    WriteToFile(`auth token verified - ${user.email}`)
    next()
  })
}

export default verifyAuthToken
