import { Request, Response } from 'express'
import User, { IUser } from '../models/user.model'
import Jrnl from '../models/jrnl.model'

const getAll = async (req: Request, res: Response) => {
  const user = req.user as IUser

  try {
    const jrnls = Jrnl.find({ userID: user.id })
    res.json(jrnls)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

const create = async (req: Request, res: Response) => {
  const userID = req.userID
  const { title, theme } = req.body

  const jrnl = new Jrnl({
    title,
    theme,
    userID,
  })

  await User.findByIdAndUpdate(userID, { $push: { jrnlIDs: jrnl._id } })
  try {
    const newJrnl = await jrnl.save()
    res.status(201).json(newJrnl)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

const deleteOne = async (req: Request, res: Response) => {
  const jrnlID = req.params.id
  const userID = req.userID

  try {
    await User.findByIdAndUpdate(userID, { $pull: { jrnlIDs: jrnlID } })
    await Jrnl.findByIdAndDelete(jrnlID)
    res.status(200).json({ message: 'Journal deleted' })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

const deleteAll = async (req: Request, res: Response) => {
  const userID = req.userID

  try {
    await User.findByIdAndUpdate(userID, { jrnlIDs: [] })
    await Jrnl.deleteMany({ userID })
    res.status(200).json({ message: 'All journals deleted' })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

const updateTitle = async (req: Request, res: Response) => {
  const jrnlID = req.params.id
  const { title } = req.body

  try {
    const jrnl = await Jrnl.findByIdAndUpdate(jrnlID, { title })
    res.status(200).json(jrnl)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

const updateTheme = async (req: Request, res: Response) => {
  const jrnlID = req.params.id
  const { theme } = req.body

  try {
    const jrnl = await Jrnl.findByIdAndUpdate(jrnlID, { theme })
    res.status(200).json(jrnl)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

const updatePage = async (req: Request, res: Response) => {
  const jrnlID = req.params.id
  const { index, page } = req.body
  const jrnl = await Jrnl.findById(jrnlID)
  if (!jrnl) return res.status(404).json({ message: 'Journal not found' })
  try {
    jrnl.pages[index] = page
    await jrnl.save()
    res.status(200).json(jrnl)
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
}
