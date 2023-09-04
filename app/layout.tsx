import './globals.css';
import type { Metadata } from 'next';
import { Inter, Nunito } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import React from "react";

const inter = Inter({ subsets: ['latin'] });
const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Curdin',
  description: 'Curdin: A Real Estate Application with Predictive Modeling',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
