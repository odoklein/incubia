import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const { type, applicantName, applicantEmail, applicantPhone, sectors, yearsExperience, availability, motivation, cvUrl } = req.body

    if (!type || !applicantName || !applicantEmail) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const newDemand = await prisma.demand.create({
      data: {
        type,
        status: 'Nouveau',
        applicantName,
        applicantEmail,
        applicantPhone,
        sectors,
        yearsExperience,
        availability,
        motivation,
        cvUrl,
      },
    })

    return res.status(201).json({ message: 'Demand created', demand: newDemand })
  } catch (error) {
    console.error('Form submit error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
