import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { PrismaClient } from '@prisma/client'

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

const prisma = new PrismaClient()

export async function createUser({ username, password }: { username: string, password: string }) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')

  const createdAt = Date.now()

  const user = {
    id: uuidv4(),
    createdAt,
    username,
    hash,
    salt,
  }

  // This is an in memory store for users, there is no data persistence without a proper DB
  const userCreate = await prisma.user.create({
    data: user
  })

  return { username, createdAt }
}

// Here you should lookup for the user in your DB
export async function findUser({ username }: { username: string }) {
  // This is an in memory store for users, there is no data persistence without a proper DB
  const user = await prisma.user.findMany({
    where: {
      username: {
        equals: username
      }
    },
    take: 1
  })

  return user[0]
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user: any, inputPassword: string) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}
