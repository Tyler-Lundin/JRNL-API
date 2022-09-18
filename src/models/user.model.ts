import mongoose, { Mongoose } from 'mongoose'

export interface IUser {
  id?: string
  _id?: string
  email: string
  password?: string // hashed
  jrnlIDs: mongoose.Schema.Types.ObjectId[]
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    jrnlIDs: {
      type: Array(mongoose.Schema.Types.ObjectId),
      ref: 'Jrnl',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
