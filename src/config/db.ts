import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '')
    console.log('\x1b[42m', `MongoDB connected: ${conn.connection.host}`, '\x1b[0m')
  } catch (error: any) {
    console.error(`Error: ${error?.message}`)
    process.exit(1)
  }
}

export default connectDB
