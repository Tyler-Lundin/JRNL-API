import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'

// @DESC : Save a page to a journal
router.post(
  '/:jrnlId/save',
  asyncHandler(async (req, res) => savePg(req, res))
)

// @DESC : Get all pages for a journal
// @ROUTE : /:jrnlId
router.get(
  '/:jrnlId',
  asyncHandler(async (req, res) => getPgs(req, res))
)

export default router
