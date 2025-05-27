import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req

  if (method === 'GET') {
    try {
      const { type, status } = query as { type?: string; status?: string }

      const where: Prisma.DemandWhereInput = {}
      if (type) where.type = type
      if (status) where.status = status

      const demands = await prisma.demand.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { notes: true },
      })

      return res.status(200).json(demands)
    } catch (error) {
      console.error('API error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  res.setHeader('Allow', ['GET'])
  res.status(405).end(`Method ${method} Not Allowed`)
}
