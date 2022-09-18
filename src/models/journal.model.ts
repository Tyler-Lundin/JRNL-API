import mongoose, { Schema, model } from 'mongoose'

export interface IsJournal {
  title: string
  theme: string
  userID: mongoose.Schema.Types.ObjectId
  pages: object[]
}

export type TPage = {
  title: string
  content: string
}

const defaultPage: TPage = {
  title: 'Untitled',
  content: '✏️ . . .',
}

const defaultPages = new Array(99).fill(defaultPage, 0, 99)

const journalSchema = new Schema<IsJournal>(
  {
    title: {
      type: String,
      required: true,
      default: 'Untitled',
    },
    theme: {
      type: String,
      required: true,
      default: 'default',
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pages: {
      type: Array<TPage>(),
      default: defaultPages,
    },
  },
  {
    timestamps: true,
  }
)

const Journal = model('Journal', journalSchema)

export default Journal
