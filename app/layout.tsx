import './globals.css';
import type { Metadata } from 'next';
import { Inter, Nunito } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';

import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './components/contexts/ToasterProvider';

import React from 'react';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import AddPropertyModal from './components/modals/AddPropertyModal';

const inter = Inter({ subsets: ['latin'] });
const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Curdin',
  description: 'Curdin: A Real Estate Application with Predictive Modeling',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <LoginModal />
        <AddPropertyModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-20">{children}</div>
      </body>
    </html>
  );
}
