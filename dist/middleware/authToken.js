'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'))
function authToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader) return res.status(400).json({ message: 'Missing auth token' })
  jsonwebtoken_1.default.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ err: 'INVALID AUTH TOKEN' })
    req.user = user
    next()
  })
}
exports.default = authToken
