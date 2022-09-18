/* eslint-disable no-unused-expressions */

import { Request, Response } from 'express'
import User, { IUser } from '../models/user.model'
import Journal from '../models/journal.model'

const getAll = async (req: Request, res: Response) => {
  const { _id } = req.user as IUser

  try {
    const journals = await Journal.find({ userID: _id })
    console.log(journals)
    res.status(200).json({ journals })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

const create = async (req: Request, res: Response) => {
  const { email, _id } = req.user as IUser
  const { title, theme } = req.body
  console.log(email, _id, title, theme)
  const journal = new Journal({
    title,
    theme,
    userID: _id,
  })

  const user = await User.findOne({ email })
  if (!user) return res.status(404).json({ message: 'User not found' })

  try {
    user.journalIDs.push(journal.id)
    await user.save()
    const newJournal = await journal.save()
    res.status(201).json(newJournal)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

const deleteOne = async (req: Request, res: Response) => {
  const journalID = req.params.id
  const userID = req.userID

  try {
    await User.findByIdAndUpdate(userID, { $pull: { journalIDs: journalID } })
    await Journal.findByIdAndDelete(journalID)
    res.status(200).json({ message: 'Journal deleted' })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

const deleteAll = async (req: Request, res: Response) => {
  const userID = req.userID

  try {
    await User.findByIdAndUpdate(userID, { journalIDs: [] })
    await Journal.deleteMany({ userID })
    res.status(200).json({ message: 'All journals deleted' })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

const updateTitle = async (req: Request, res: Response) => {
  const journalID = req.params.id
  const { title } = req.body

  try {
    const journal = await Journal.findByIdAndUpdate(journalID, { title })
    res.status(200).json(journal)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

const updateTheme = async (req: Request, res: Response) => {
  const journalID = req.params.id
  const { theme } = req.body

  try {
    const journal = await Journal.findByIdAndUpdate(journalID, { theme })
    res.status(200).json(journal)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

const updatePage = async (req: Request, res: Response) => {
  const journalID = req.params.id
  const { index, page } = req.body
  const journal = await Journal.findById(journalID)
  if (!journal) return res.status(404).json({ message: 'Journal not found' })
  try {
    journal.pages[index] = page
    await journal.save()
    res.status(200).json(journal)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

const save = async (req: Request, res: Response) => {
  const { journal } = req.body

  const savedJournal = await Journal.findById(journal._id)
  if (!savedJournal) return res.status(404).json({ message: 'Journal not found' })
  try {
    savedJournal.pages = journal.pages
    await savedJournal.save()
    res.status(200).json(savedJournal)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export default {
  getAll,
  create,
  deleteOne,
  deleteAll,
  updateTitle,
  updateTheme,
  updatePage,
  save,
}
