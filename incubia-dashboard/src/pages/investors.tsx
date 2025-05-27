import React from 'react';
import { useDemands } from '@/hooks/useDemands';
import RequestList from '@/components/RequestList';

export default function MentorsPage() {
  const { data, isLoading, error } = useDemands('investor');

  if (isLoading) return <p>Chargement…</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Demandes de mentors</h2>
      <RequestList items={data ?? []} />
    </div>
  );
}
