import jwt from 'jsonwebtoken'

function authToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization']

  if (!authHeader) return res.status(400).json({ msg: 'Missing auth token' })
  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ err: 'INVALID AUTH TOKEN' })
    req.user = user
    next()
  })
}

export default authToken
