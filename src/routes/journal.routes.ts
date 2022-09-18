import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import controller from '../controllers/journal.controller'

router.get(
  '/all',
  asyncHandler(async (req: Request, res: Response) => {
    controller.getAll(req, res)
  })
)

router.post(
  '/create',
  asyncHandler(async (req: Request, res: Response) => {
    controller.create(req, res)
  })
)

router.delete(
  '/delete/:id',
  asyncHandler(async (req: Request, res: Response) => {
    controller.deleteOne(req, res)
  })
)

router.delete(
  '/delete/all',
  asyncHandler(async (req: Request, res: Response) => {
    controller.deleteAll(req, res)
  })
)

router.patch(
  '/title/:id',
  asyncHandler(async (req: Request, res: Response) => {
    controller.updateTitle(req, res)
  })
)

router.patch(
  '/theme/:id',
  asyncHandler(async (req: Request, res: Response) => {
    controller.updateTheme(req, res)
  })
)

router.patch(
  '/page/:id',
  asyncHandler(async (req: Request, res: Response) => {
    controller.updatePage(req, res)
  })
)

router.post(
  '/save',
  asyncHandler(async (req: Request, res: Response) => {
    controller.save(req, res)
  })
)

export default router
