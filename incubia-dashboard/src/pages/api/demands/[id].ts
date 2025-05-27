import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid id' })
  }

  try {
    const demand = await prisma.demand.findUnique({
      where: { id },
      include: { notes: true },
    })

    if (!demand) {
      return res.status(404).json({ error: 'Demande introuvable' })
    }

    if (req.method === 'GET') {
      return res.status(200).json(demand)
    }

    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
