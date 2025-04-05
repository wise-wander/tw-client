import { fontMono, fontSans } from '@/config/font';
import '@/styles/globals.css';
import cn from '@/utils';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'TripWise',
  description: 'Intelligent Destination and Route Recommendations for Journey',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          fontSans.variable,
          fontMono.variable,
          'min-h-screen font-sans antialiased',
        )}
      >
        <main className='relative'>{children}</main>
        <Toaster position='top-right' />
      </body>
    </html>
  );
}
