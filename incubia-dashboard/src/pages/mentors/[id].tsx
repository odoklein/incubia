// src/pages/mentors/[id].tsx
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Note = {
  id: string
  content: string
  createdAt: string
}

type Demand = {
  id: string
  applicant: {
    name: string
    email: string
    phone?: string
  }
  status: string
  createdAt: string
  metadata: Record<string, unknown>  // Changed 'any' to 'unknown' to satisfy ESLint
  notes: Note[]
}

export default function MentorDetailPage() {
  const router = useRouter()
  const { id } = router.query

  const [demand, setDemand] = useState<Demand | null>(null)
  const [loading, setLoading] = useState(true)
  const [statusUpdating, setStatusUpdating] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [addingNote, setAddingNote] = useState(false)

  useEffect(() => {
    if (!id) return
    async function fetchDemand() {
      setLoading(true)
      const res = await fetch(`/api/demands/${id}`)
      if (res.ok) {
        const data = await res.json()
        setDemand(data)
      } else {
        setDemand(null)
      }
      setLoading(false)
    }
    fetchDemand()
  }, [id])

  if (loading) return <p>Chargement...</p>
  if (!demand) return <p>Demande introuvable.</p>

  async function updateStatus(newStatus: string) {
  setStatusUpdating(true)
  const res = await fetch(`/api/demands/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  })
  if (res.ok) {
    if (demand) {
      setDemand({ ...demand, status: newStatus }) // demand is guaranteed not null here
    }
  } else {
    alert('Erreur lors de la mise à jour du statut')
  }
  setStatusUpdating(false)
}


  async function addNote() {
  if (!newNote.trim()) return
  setAddingNote(true)
  const res = await fetch(`/api/demands/${id}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: newNote }),
  })
  if (res.ok) {
    const note = await res.json()
    if (demand) {
      setDemand({ ...demand, notes: [...demand.notes, note] })
    }
    setNewNote('')
  } else {
    alert('Erreur lors de l\'ajout de la note')
  }
  setAddingNote(false)
}

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Détails de la demande</h1>

      <section className="mb-6">
        <h2>Informations du candidat</h2>
        <p><strong>Nom:</strong> {demand.applicant.name}</p>
        <p><strong>Email:</strong> {demand.applicant.email}</p>
        {demand.applicant.phone && <p><strong>Téléphone:</strong> {demand.applicant.phone}</p>}
        <p><strong>Date de création:</strong> {new Date(demand.createdAt).toLocaleString()}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Statut</h2>
        <p className="mb-2 font-medium">{demand.status}</p>
        <div className="space-x-2">
          {['Nouveau', 'Confirmé', 'Abandonné'].map((statusOption) => (
            <button
              key={statusOption}
              onClick={() => updateStatus(statusOption)}
              disabled={statusUpdating}
              className={`px-4 py-2 rounded ${
                demand.status === statusOption ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {statusOption}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Notes</h2>
        <ul className="mb-4 space-y-2">
          {demand.notes.length === 0 && <li>Aucune note pour le moment.</li>}
          {demand.notes.map(({ id, content, createdAt }) => (
            <li key={id} className="border p-2 rounded">
              <p>{content}</p>
              <small className="text-gray-600">{new Date(createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
        <textarea
          className="w-full border rounded p-2"
          rows={3}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Ajouter une note interne"
          disabled={addingNote}
        />
        <button
          onClick={addNote}
          disabled={addingNote}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Ajouter la note
        </button>
      </section>
    </div>
  )
}
