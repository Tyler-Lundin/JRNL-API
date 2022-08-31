import User from '../models/user.model.js'
import Jrnl from '../models/jrnl.model.js'

export const createJrnl = async (req, res) => {
  const { title } = req.body
  const { userId } = req.user
  const newJrnl = new Jrnl({ title, pages: [], user: userId })
  const savedJrnl = await newJrnl.save()

  const user = await User.findById(userId)
  user.jrnls.push(savedJrnl._id)
  await user.save()
  if (savedJrnl && user) {
    return res.status(201).json(savedJrnl)
  }

  res.status(500).json({ message: 'Something went wrong' })
}

export const getJrnls = async (req, res) => {
  const { userId } = req.user
  const user = await User.findById(userId)
  const jrnls = await Jrnl.find({ user: userId })
  if (jrnls && user) {
    return res.status(200).json(jrnls)
  }
  res.status(500).json({ message: 'Something went wrong' })
}

export const deleteJrnl = async (req, res) => {
  const { userId } = req.user
  const { jrnlId } = req.params
  const user = await User.findById(userId)
  const jrnl = await Jrnl.findById(jrnlId)
  if (jrnl && user) {
    await jrnl.remove()
    user.jrnls.pull(jrnlId)
    await user.save()
    return res.status(200).json({ message: 'Journal deleted' })
  }
  res.status(500).json({ message: 'Something went wrong' })
}
