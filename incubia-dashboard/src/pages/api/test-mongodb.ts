import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise
    const db = client.db('incubia')  // match your DB name here

    const collections = await db.listCollections().toArray()

    res.status(200).json({ message: 'MongoDB connected!', collectionsCount: collections.length })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    res.status(500).json({ error: 'MongoDB connection failed', details: message })
  }
}
