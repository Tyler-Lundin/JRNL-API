import express from 'express'
import asyncHandler from 'express-async-handler'
import { createJrnl, deleteJrnl, getJrnls } from '../controllers/jrnl.controller.js'
const router = express.Router()

import { jrnls_data } from '../_DATA.js'

router.get(
  '/',
  asyncHandler(async (req, res) => {
    res.status(200).json(jrnls_data)
  })
)

// @DESC : Create a new journal
// @ROUTE : /jrnls/create
// @METHOD : POST
router.post(
  '/create',
  asyncHandler(async (req, res) => createJrnl(req, res))
)

// @DESC : Get all journals
// @ROUTE : /jrnls/all
// @METHOD : GET
router.get(
  '/all',
  asyncHandler(async (req, res) => getJrnls(req, res))
)

// @DESC : Delete a journal
// @ROUTE : /jrnls/delete/:jrnlId
// @METHOD : DELETE
router.delete('/delete/:jrnlId', (req, res) => deleteJrnl(req, res))

export default router
