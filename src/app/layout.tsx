import type { Metadata } from 'next';
// Removed Poppins import from next/font/google
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// Removed Poppins font configuration using next/font/google

export const metadata: Metadata = {
  title: 'Portal de Gestión - Banesco Seguros',
  description: 'Portal de Gestión Interna de Banesco Seguros',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Removed poppins.variable from html className
    <html lang="en"> 
      {/* font-sans will now use 'Poppins' from Tailwind config */}
      <body className={`font-sans antialiased`}> 
        {children}
        <Toaster />
      </body>
    </html>
  );
}
