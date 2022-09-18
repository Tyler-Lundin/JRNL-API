import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import verifyAuthToken from './middleware/verifyAuthToken'
import authRoutes from './routes/auth.routes'
import jrnlRoutes from './routes/jrnl.routes'
import connectDB from './config/db'
import colors from 'colors'
import cookieParser from 'cookie-parser'

const { bgYellow } = colors

dotenv.config()
const app = express()
connectDB()
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(cookieParser())

// routes
app.use('/auth', authRoutes)
app.use('/jrnl', verifyAuthToken, jrnlRoutes)

// server start
const PORT = process.env.PORT || 3500
app.listen(PORT, () =>
  console.log(
    `LISTENING ON PORT ${PORT} | ${process.env.NODE_ENV?.toUpperCase()} MODE`.america.bgYellow
  )
)
