import { createUser } from '../../lib/user'
import { Request, Response } from 'express'

export async function signup(req: Request, res: Response) {
  try {
    await createUser(req.body)
    res.status(200).send({ done: true })
  } catch (error: any) {
    console.error(error)
    res.status(500).end(error.message)
  }
}