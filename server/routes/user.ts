import { getLoginSession } from '../../lib/auth'
import { findUser } from '../../lib/user'
import { Request, Response } from 'express'

export async function user(req: Request, res: Response) {
  try {
    const session = await getLoginSession(req)
    const user = (session && (await findUser(session))) ?? null

    res.status(200).json({ user: (user ? { username: user.username } : user) })
  } catch (error) {
    console.error(error)
    res.status(500).end('Authentication token is invalid, please log in')
  }
}