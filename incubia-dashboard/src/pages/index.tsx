import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Tableau de bord</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/mentors" className="text-blue-600 hover:underline">
            → Demandes de mentors
          </Link>
        </li>
        <li>
          <Link href="/investors" className="text-blue-600 hover:underline">
            → Demandes d’investisseurs
          </Link>
        </li>
        <li>
          <Link href="/startups" className="text-blue-600 hover:underline">
            → Candidatures de startups
          </Link>
        </li>
      </ul>
    </div>
  );
}
