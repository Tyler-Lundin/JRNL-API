import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '')
    console.log(`MongoDB connected: ${conn.connection.host}`.bgGreen.black)
  } catch (error: any) {
    console.error(`Error: ${error?.message}`.bgRed.black)
    process.exit(1)
  }
}

export default connectDB
