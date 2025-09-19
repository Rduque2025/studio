import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';


export const metadata: Metadata = {
  title: 'Portal de Gestión - Banesco Seguros',
  description: 'Portal de Gestión Interna de Banesco Seguros',
  icons: {
    icon: 'https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_auto,s_webp:avif/banescointernacional.com/wp-content/uploads/2024/12/cropped-banescointernacional.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* font-sans will now use 'Poppins' from Tailwind config */}
      <body className={`font-sans antialiased`}> 
        {children}
        <Toaster />
      </body>
    </html>
  );
}
