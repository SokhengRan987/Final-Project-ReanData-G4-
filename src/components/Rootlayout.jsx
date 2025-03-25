import React from 'react';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout() {
  return (
    <div className="root-layout">
      <NavbarComponent />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
