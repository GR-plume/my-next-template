import passport from 'passport'
import { setLoginSession } from '../../lib/auth'
import { Request, Response } from 'express'

const authenticate = (method: string, req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

export async function login(req: Request, res: Response){
  try {
    const user: any = await authenticate('local', req, res)
    // session is the payload to save in the token, it may contain basic info about the user
    const session = { ...user }

    await setLoginSession(res, session)

    res.status(200).send({ done: true })
  } catch (error: any) {
    console.error(error)
    res.status(401).send(error.message)
  }
}