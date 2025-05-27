import React from 'react';
import Link from 'next/link';
import type { Demand } from '@/lib/types';
import StatusBadge from './StatusBadge';

type Props = { demand: Demand };

export default function RequestItem({ demand }: Props) {
  const { id, type, status, createdAt, applicant, metadata } = demand;
  const date = new Date(createdAt).toLocaleDateString('fr-FR');
  let excerpt = '…';
  if ('motivation' in metadata) excerpt = metadata.motivation;
  else if ('pastExperience' in metadata) excerpt = metadata.pastExperience;
  else if ('description' in metadata) excerpt = metadata.description;

  return (
    <Link
      href={`/${type}/${id}`}
      className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">{date}</span>
        <StatusBadge status={status} />
      </div>
      <h3 className="text-lg font-medium text-gray-900">{applicant.name}</h3>
      <p className="text-sm text-gray-600 mt-1 truncate">{excerpt}</p>
    </Link>
  );
}
