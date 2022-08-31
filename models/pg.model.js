import mongoose, { Mongoose } from 'mongoose'

const pgSchema = new mongoose.Schema({
  jrnlId: { type: Mongoose.Schema.Types.ObjectId, ref: 'Jrnl' },
  index: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Pg = mongoose.model('Pg', pgSchema)

export default Pg
