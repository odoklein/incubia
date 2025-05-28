import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'  // your fixed client promise

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise  // await here
    const db = client.db()

    // do something with db...

    res.status(200).json({ message: 'Success' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
