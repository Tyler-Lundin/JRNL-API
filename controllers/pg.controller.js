export const savePg = async (req, res) => {
  const { jrnlId, index, title, content } = req.body
  const newPg = new Pg({ jrnlId, index, title, content })
  const savedPg = await newPg.save()
  if (savedPg) {
    return res.status(201).json(savedPg)
  }
  res.status(500).json({ message: 'Something went wrong' })
}

export const getPgs = async (req, res) => {
  const { jrnlId } = req.params
  const pgs = await Pg.find({ jrnlId })
  if (pgs) {
    return res.status(200).json(pgs)
  }
  res.status(500).json({ message: 'Something went wrong' })
}
