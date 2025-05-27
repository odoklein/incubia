import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid id' })
  }

  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const { status } = req.body

    if (!status || typeof status !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid status' })
    }

    const updatedDemand = await prisma.demand.update({
      where: { id },
      data: { status },
    })

    return res.status(200).json(updatedDemand)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
