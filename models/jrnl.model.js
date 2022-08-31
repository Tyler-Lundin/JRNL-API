import mongoose from 'mongoose'

const jrnlSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pages: {
      type: Array(Object) || [],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Jrnl = mongoose.model('Jrnl', jrnlSchema)

export default Jrnl
