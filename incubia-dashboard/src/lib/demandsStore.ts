
// src/lib/demandsStore.ts
export const DEMANDS = [
  {
    id: '58f6197e-7504-401e-9530-2d02592801ae',  // fixed ID for Alice Dupont
    type: 'mentor',
    status: 'Nouveau',
    createdAt: new Date().toISOString(),
    applicant: {
      name: 'Alice Dupont',
      email: 'alice@exemple.com',
      phone: '0612345678',
    },
    metadata: {
      sectors: ['Tech'],
      yearsExperience: 7,
      availability: '2 heures/semaine',
      motivation: 'Partager mon expérience',
      cvUrl: '',
    },
    notes: [],
  },
  {
    id: 'a1234567-89ab-cdef-0123-456789abcdef', // example fixed ID for another demand
    type: 'mentor',
    status: 'Confirmé',
    createdAt: new Date().toISOString(),
    applicant: {
      name: 'Bob Martin',
      email: 'bob@example.com',
      phone: '0698765432',
    },
    metadata: {
      sectors: ['Finance'],
      yearsExperience: 10,
      availability: '1 heure/semaine',
      motivation: 'Aider les startups',
      cvUrl: '',
    },
    notes: [],
  },
  // Add more fixed demands here if you want
]
