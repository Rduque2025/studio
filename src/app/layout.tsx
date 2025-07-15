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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      {/* font-sans will now use 'Poppins' from Tailwind config */}
      <body className={`font-sans antialiased`}> 
        {children}
        <Toaster />
      </body>
    </html>
  );
}
