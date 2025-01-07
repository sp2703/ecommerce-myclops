import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';
import Header from '@/components/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}