const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const demand = await prisma.demand.create({
    data: {
      type: 'mentor',
      status: 'Nouveau',
      applicantName: 'Alice Dupont',
      applicantEmail: 'alice@exemple.com',
      applicantPhone: '0612345678',
      sectors: ['Tech'],  // Prisma JSON accepts native JS arrays
      yearsExperience: 7,
      availability: '2 heures/semaine',
      motivation: 'Partager mon expérience',
      cvUrl: '',
      notes: {},
    },
  })
  console.log('Created demand:', demand)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
