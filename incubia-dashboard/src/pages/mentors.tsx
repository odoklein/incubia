// src/pages/mentors.tsx
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Demand = {
  id: string
  applicant: { name: string; email: string }
  status: string
  createdAt: string
}

export default function MentorsPage() {
  const [demands, setDemands] = useState<Demand[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDemands() {
      const res = await fetch('/api/demands?type=mentor')
      const data = await res.json()
      console.log('Fetched demands:', data)  // <-- check id presence here
      setDemands(data)
      setLoading(false)
    }
    fetchDemands()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Mentors</h1>
      {demands.length === 0 && <p>No demands found.</p>}
      {demands.map((demand) => (
         <div key={demand.id} className="card border p-3 my-2">
           <p><strong>Name:</strong> {demand.applicantName}</p>
            <p><strong>Email:</strong> {demand.applicantEmail}</p>
       {demand.applicantPhone && <p><strong>Phone:</strong> {demand.applicantPhone}</p>}
            <p><strong>ID:</strong> {demand.id}</p>
             <p><strong>Status:</strong> {demand.status}</p>
    
    {/* Add this Link to open detail page */}
    <Link href={`/mentors/${demand.id}`}>
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        Voir détails
      </button>
    </Link>
  </div>
))}

    </div>
  )
}
