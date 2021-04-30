/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express'
import * as ItemService from './items.service'
import { BaseItem, Item } from './item.interface'

/**
 * Router Definition
 */
export const itemsRouter = express.Router()

/**
 * Controller Definitions
 */

// GET items
itemsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const items: Item[] = await ItemService.findAll()

    res.status(200).send(items)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

// GET items/:id
itemsRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = +req.params.id

  try {
    const item: Item = await ItemService.find(id)

    if (item) return res.status(200).send(item)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

// POST items
itemsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body

    const newItem = await ItemService.create(item)

    res.status(201).json(newItem)
  } catch (e) {
    res.status(500).json(e.message)
  }
})

// PUT items/:id
itemsRouter.put('/:id', async (req: Request, res: Response) => {
  const id: number = +req.params.id

  try {
    const itemUpdate: Item = req.body

    const existingItem: Item = await ItemService.find(id)

    if (existingItem) {
      const updatedItem = await ItemService.update(id, itemUpdate)
      return res.status(200).json(updatedItem)
    }

    const newItem = await ItemService.create(itemUpdate)

    res.status(201).json(newItem)
  } catch (e) {
    res.status(500).json(e.message)
  }
})

// DELETE items/:id
itemsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = +req.params.id
    await ItemService.remove(id)

    res.sendStatus(204)
  } catch (e) {
    res.status(500).send(e.message)
  }
})
