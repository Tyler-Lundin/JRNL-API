import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import JRNL from '../controllers/jrnl.controller'

router.get(
  '/jrnls',
  asyncHandler(async (req: Request, res: Response) => {
    JRNL.getAll(req, res)
  })
)

router.post(
  '/create',
  asyncHandler(async (req: Request, res: Response) => {
    JRNL.create(req, res)
  })
)

router.delete(
  '/delete/:id',
  asyncHandler(async (req: Request, res: Response) => {
    JRNL.deleteOne(req, res)
  })
)

router.delete(
  '/delete/all',
  asyncHandler(async (req: Request, res: Response) => {
    JRNL.deleteAll(req, res)
  })
)

router.patch(
  '/title/:id',
  asyncHandler(async (req: Request, res: Response) => {
    JRNL.updateTitle(req, res)
  })
)

router.patch(
  '/theme/:id',
  asyncHandler(async (req: Request, res: Response) => {
    JRNL.updateTheme(req, res)
  })
)

router.patch(
  '/page/:id',
  asyncHandler(async (req: Request, res: Response) => {
    JRNL.updatePage(req, res)
  })
)

export default router
