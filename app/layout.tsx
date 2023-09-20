import './globals.css';
import type { Metadata } from 'next';
import { Content, Inter, Nunito } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';

import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './components/contexts/ToasterProvider';

import React from 'react';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';

const inter = Inter({ subsets: ['latin'] });
const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Curdin',
  description: 'Curdin: A Real Estate Application with Predictive Modeling',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
