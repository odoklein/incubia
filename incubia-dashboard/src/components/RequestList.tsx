import React from 'react';
import type { Demand } from '@/lib/types';
import RequestItem from './RequestItem';

type Props = { items: Demand[] };

export default function RequestList({ items }: Props) {
  if (!items || items.length === 0) {
    return <p className="text-center text-gray-500 py-8">Aucune demande trouvée.</p>;
  }
  return <div className="space-y-4">{items.map((d) => <RequestItem key={d.id} demand={d} />)}</div>;
}
