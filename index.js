import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import expressAsyncHandler from 'express-async-handler'
import authRoutes from './routes/auth.routes.js'
import jrnlRoutes from './routes/jrnl.routes.js'
import connectDB from './config/db.js'
import colors from 'colors'
import authToken from './middleware/authToken.js'

dotenv.config()
const app = express()
connectDB() /
  // middleware
  app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// routes
app.use('/auth', authRoutes)
app.use('/jrnl', authToken, jrnlRoutes)
app.use('/pg', jrnlRoutes)

// server start
const PORT = process.env.PORT || 3500
app.listen(
  PORT,
  console.log(
    `LISTENING ON PORT ${PORT} | ${process.env.NODE_ENV.toUpperCase()} MODE`.yellow.black.bgYellow
  )
)

// // // // // // // // // // // // // // // // //
// import connectDB from './config/db.js'
// config config config config config config

// routes routes routes routes routes routes routes routes
// import productRoutes from './routes/productRoutes.js'
// import authRoutes from './routes/authRoutes.js'
// import orderRoutes from './routes/orderRoutes.js'
// import bagRoutes from './routes/bagRoutes.js'
// import adminRoutes from './routes/adminRoutes.js'
// import discountRoutes from './routes/discountRoutes.js'
// import profileRoutes from './routes/profileRoutes.js'
// routes routes routes routes routes routes routes routes

// middleware middleware middleware middleware middleware middleware
// import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// import isAdmin from './middleware/isAdmin.js'
// import authToken from './middleware/authToken.js'
// import connectDB from './config/db.js'
// middleware middleware middleware middleware middleware middleware

// connectDB()

// app.use(cors())
// app.use(express.json())

// app.use('/api/auth', authRoutes)
// app.use('/api/products', productRoutes)
// app.use('/api/discounts', discountRoutes)
// app.use('/api/order', authToken, orderRoutes)
// app.use('/api/bag', authToken, bagRoutes)
// app.use('/api/admin', authToken, isAdmin, adminRoutes)
// app.use('/api/profile', authToken, profileRoutes)
// app.use(notFound)
// app.use(errorHandler)
//
