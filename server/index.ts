import 'dotenv/config'
import next from 'next'
import express, { Request, Response } from 'express'
import { Server } from 'socket.io'
import http from 'http'
import passport from 'passport'
import { localStrategy } from '../lib/password-local'
import { user, login, logout, signup } from './routes'

const port = parseInt(process.env.PORT as string, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  const httpServer = http.createServer(server)
  const io = new Server()
  io.attach(httpServer)

  server.use(express.json())
  server.use(express.urlencoded({ extended: true }))

  passport.use(localStrategy)
  server.use(passport.initialize())

  server.post('/user', user)
  server.post('/login', login)
  server.use('/logout', logout)
  server.post('/signup', signup)

  io.on('connection', (socket) => {
    console.log(`id: ${socket.id} is connected`)
    socket.on('disconnect', reason => console.log(`id: ${socket.id} is disconnected.`, reason))
  })

  io.engine.on("connection_error", (err: Error) => {
    console.log('io.engine connection_error', err)
  })

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res)
  })

  httpServer.listen(port, (err?: Error) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})