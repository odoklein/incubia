import React from 'react';

type Status = 'Nouveau' | 'Confirmé' | 'Abandonné' | 'En attente';
const styles: Record<Status, string> = {
  Nouveau: 'bg-gray-200 text-gray-800',
  Confirmé: 'bg-green-100 text-green-800',
  Abandonné: 'bg-red-100 text-red-800',
  'En attente': 'bg-orange-100 text-orange-800',
};

export default function StatusBadge({ status }: { status: Status }) {
  return <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${styles[status]}`}>{status}</span>;
}
