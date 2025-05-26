import type { Metadata } from 'next';
import { Poppins } from 'next/font/google'; // Import Poppins
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// Configure Poppins font
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap', // Ensures text remains visible during font loading
  variable: '--font-poppins', // CSS variable for Tailwind
});

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
      <body className={`${poppins.variable} font-sans antialiased`}> {/* Apply Poppins variable and a base font-sans class */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
