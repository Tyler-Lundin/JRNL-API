import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from './config/db'
import cookieParser from 'cookie-parser'
import { isListeningOn } from './utils/isListeningOn'
import router from './routes/Router'

dotenv.config()
const app = express()
connectDB()
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(cookieParser())

app.use(router)

// server start
const PORT = process.env.PORT || 3500
app.listen(PORT, isListeningOn(PORT))
