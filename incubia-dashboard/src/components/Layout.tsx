import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-6 overflow-auto">{children}</main>
    </div>
  );
}
