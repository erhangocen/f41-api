import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Methods from '../request_methods'
import { verify } from 'jsonwebtoken'

export function withMethods(methods: Methods[], handler: NextApiHandler, isProtected: boolean = true) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (!req.method || !methods.includes(req.method as Methods)) {
      return res.status(405).end()
    }

    if (isProtected) {
      if (!req.headers.authorization) {
        return res.status(401).json({ error: "unauthorized" })
      }
      else {
        try {
          verify(req.headers.authorization.split("Bearer ")[1], process.env.JWT_SECRET ?? "")
          return handler(req, res)
        } catch (error) {
          return res.status(401).json({ error: "Your token is invalid" })
        }
      }
    }

    return handler(req, res)
  }
}