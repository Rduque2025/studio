import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';


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
    <html lang="en">
      <head />
      {/* font-sans will now use 'Poppins' from Tailwind config */}
      <body className={`font-sans antialiased`}> 
        {children}
        <Toaster />
      </body>
    </html>
  );
}
