import { removeTokenCookie } from '../../lib/auth-cookies'
import { Request, Response } from 'express'

export async function logout(req: Request, res: Response) {
  removeTokenCookie(res)
  res.writeHead(302, { Location: '/' })
  res.end()
}