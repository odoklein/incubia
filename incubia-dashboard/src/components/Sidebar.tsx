import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const menu = [
  { label: 'Mentors', href: '/mentors' },
  { label: 'Investisseurs', href: '/investors' },
  { label: 'Startups', href: '/startups' },
];

export default function Sidebar() {
  const { pathname } = useRouter();
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      <h1 className="mb-8 text-2xl font-bold text-blue-600">incubia</h1>
      <nav className="space-y-2">
        {menu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-lg font-medium ${
                active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
